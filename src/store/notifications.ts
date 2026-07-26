import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getTodayString } from "./common";

export type PrayerName =
  | "fajr"
  | "sunrise"
  | "dhuhr"
  | "asr"
  | "maghrib"
  | "isha";

export type NotificationDay = "today" | "tomorrow";

export type NotificationStatus =
  | "pending" // queued, not yet handed to the OS
  | "scheduled" // expo-notifications confirmed the trigger
  | "failed" // scheduling threw
  | "cancelled"; // explicitly cancelled (e.g. user disabled that prayer)

export interface ScheduledNotification {
  notificationId: string; // id returned by Notifications.scheduleNotificationAsync
  prayer: PrayerName;
  day: NotificationDay;
  triggerTimestamp: number; // epoch ms
  triggerTimeString: string; // formatted time string
  status: NotificationStatus;
}

type NotificationKey = `${NotificationDay}:${PrayerName}`;
const key = (day: NotificationDay, prayer: PrayerName): NotificationKey =>
  `${day}:${prayer}`;

interface NotificationsSchedulerState {
  notifications: Record<string, ScheduledNotification>;
  // stamped with today's calendar date whenever a scheduling pass runs,
  // mirrors the cachedDate pattern in prayer-times store
  lastScheduledDate: Record<NotificationDay, string | null>;
  hydrated: boolean;

  upsertNotification: (notification: ScheduledNotification) => void;
  removeNotification: (day: NotificationDay, prayer: PrayerName) => void;
  getNotification: (
    day: NotificationDay,
    prayer: PrayerName,
  ) => ScheduledNotification | undefined;
  getNotificationsForDay: (day: NotificationDay) => ScheduledNotification[];
  clearDay: (day: NotificationDay) => void;
  clearAll: () => void;
  setLastScheduledDate: (day: NotificationDay, date: string) => void;
  isDayStale: (day: NotificationDay) => boolean;
}

const notificationsStore = create<NotificationsSchedulerState>()(
  persist(
    (set, get) => ({
      notifications: {},
      lastScheduledDate: { today: null, tomorrow: null },
      hydrated: false,

      upsertNotification: (notification) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [key(notification.day, notification.prayer)]: notification,
          },
        })),

      removeNotification: (day, prayer) =>
        set((state) => {
          const next = { ...state.notifications };
          delete next[key(day, prayer)];
          return { notifications: next };
        }),

      getNotification: (day, prayer) => get().notifications[key(day, prayer)],

      getNotificationsForDay: (day) =>
        Object.values(get().notifications).filter((n) => n.day === day),

      clearDay: (day) =>
        set((state) => {
          const next = { ...state.notifications };
          (Object.keys(next) as NotificationKey[]).forEach((k) => {
            if (next[k].day === day) delete next[k];
          });
          return {
            notifications: next,
            lastScheduledDate: { ...state.lastScheduledDate, [day]: null },
          };
        }),

      clearAll: () =>
        set({
          notifications: {},
          lastScheduledDate: { today: null, tomorrow: null },
        }),

      setLastScheduledDate: (day, date) =>
        set((state) => ({
          lastScheduledDate: { ...state.lastScheduledDate, [day]: date },
        })),

      isDayStale: (day) => get().lastScheduledDate[day] !== getTodayString(),
    }),
    {
      name: "st-notifications-scheduler",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const useNotificationsSchedulerStore = () =>
  notificationsStore((s) => s);

export const useNotificationsForDay = (day: NotificationDay) =>
  notificationsStore((s) => s.getNotificationsForDay(day));

export const notificationsSchedulerActions = {
  upsertNotification: notificationsStore.getState().upsertNotification,
  removeNotification: notificationsStore.getState().removeNotification,
  clearDay: notificationsStore.getState().clearDay,
  clearAll: notificationsStore.getState().clearAll,
  setLastScheduledDate: notificationsStore.getState().setLastScheduledDate,
};

export const getNotificationsSchedulerState = () =>
  notificationsStore.getState();
