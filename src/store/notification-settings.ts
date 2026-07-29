import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PrayerName } from "./notifications";

type PrayerNotificationSettings = Record<PrayerName, boolean>;

interface NotificationSettingsState {
  enabled: PrayerNotificationSettings;
  firstTimeExactAlarmAccessPrompted: boolean;
  exactAlarmAccessGranted: boolean;
  hydrated: boolean;
  setEnabled: (prayer: PrayerName, enabled: boolean) => void;
  toggleEnabled: (prayer: PrayerName) => void;
  isEnabled: (prayer: PrayerName) => boolean;
  setExactAlarmAccessGranted: (granted: boolean) => void;
  setFirstTimeExactAlarmAccessPrompted: (granted: boolean) => void;
}

// sunrise defaults to off since it's not a prayer you pray, just a marker
const DEFAULT_ENABLED: PrayerNotificationSettings = {
  fajr: true,
  shuruq: false,
  dhuhr: true,
  asr: true,
  maghrib: true,
  isha: true,
};

const notificationSettingsStore = create<NotificationSettingsState>()(
  persist(
    (set, get) => ({
      enabled: DEFAULT_ENABLED,
      exactAlarmAccessGranted: Platform.OS === "ios" ? true : false,
      firstTimeExactAlarmAccessPrompted: Platform.OS === "ios" ? true : false,
      hydrated: false,

      setEnabled: (prayer, enabled) =>
        set((state) => ({
          enabled: { ...state.enabled, [prayer]: enabled },
        })),

      toggleEnabled: (prayer) =>
        set((state) => ({
          enabled: { ...state.enabled, [prayer]: !state.enabled[prayer] },
        })),

      isEnabled: (prayer) => get().enabled[prayer],

      setFirstTimeExactAlarmAccessPrompted: (granted) =>
        set({ firstTimeExactAlarmAccessPrompted: granted }),

      setExactAlarmAccessGranted: (granted) =>
        set({ exactAlarmAccessGranted: granted }),
    }),
    {
      name: "st-notification-settings",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => async (state) => {
        if (state) state.hydrated = true;
        const raw = await AsyncStorage.getItem("st-notification-settings");
        if (!raw) {
          notificationSettingsStore.setState({
            enabled: DEFAULT_ENABLED,
            exactAlarmAccessGranted: Platform.OS === "ios" ? true : false,
            firstTimeExactAlarmAccessPrompted:
              Platform.OS === "ios" ? true : false,
          });
        }
      },
    },
  ),
);

export const useNotificationSettingsStore = () =>
  notificationSettingsStore((s) => s);

export const usePrayerNotificationEnabled = (prayer: PrayerName) =>
  notificationSettingsStore((s) => s.enabled[prayer]);

export const useExactAlarmAccessGranted = () =>
  notificationSettingsStore((s) => s.exactAlarmAccessGranted);

export const getNotificationSettingsState = () =>
  notificationSettingsStore.getState();
