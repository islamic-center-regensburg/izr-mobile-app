import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PrayerName } from "./notifications";

type PrayerNotificationSettings = Record<PrayerName, boolean>;

interface NotificationSettingsState {
  enabled: PrayerNotificationSettings;
  hydrated: boolean;
  setEnabled: (prayer: PrayerName, enabled: boolean) => void;
  toggleEnabled: (prayer: PrayerName) => void;
  isEnabled: (prayer: PrayerName) => boolean;
}

// sunrise defaults to off since it's not a prayer you pray, just a marker
const DEFAULT_ENABLED: PrayerNotificationSettings = {
  fajr: true,
  sunrise: false,
  dhuhr: true,
  asr: true,
  maghrib: true,
  isha: true,
};

const notificationSettingsStore = create<NotificationSettingsState>()(
  persist(
    (set, get) => ({
      enabled: DEFAULT_ENABLED,
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
    }),
    {
      name: "st-notification-settings",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => async (state) => {
        if (state) state.hydrated = true;
        const raw = await AsyncStorage.getItem("st-notification-settings");
        if (!raw) {
          notificationSettingsStore.setState({ enabled: DEFAULT_ENABLED });
        }
      },
    },
  ),
);

export const useNotificationSettingsStore = () =>
  notificationSettingsStore((s) => s);

export const usePrayerNotificationEnabled = (prayer: PrayerName) =>
  notificationSettingsStore((s) => s.enabled[prayer]);

export const getNotificationSettingsState = () =>
  notificationSettingsStore.getState();
