// stores/today-prayer-times-store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PrayerTimes } from "../api";

interface TodayPrayerTimesState {
  prayerTimes: PrayerTimes | null;
  cachedDate: string | null;
  hydrated: boolean;
  setPrayerTimes: (prayerTimes: PrayerTimes) => void;
  clearPrayerTimes: () => void;
}

const getTodayString = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

const todayPrayerTimesStore = create<TodayPrayerTimesState>()(
  persist(
    (set) => ({
      prayerTimes: null,
      cachedDate: null,
      hydrated: false,
      setPrayerTimes: (prayerTimes) =>
        set({ prayerTimes, cachedDate: getTodayString() }),
      clearPrayerTimes: () => set({ prayerTimes: null, cachedDate: null }),
    }),
    {
      name: "st-today-prayer-times",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const useTodayPrayerTimesStore = () => todayPrayerTimesStore((s) => s);

export const isCacheValid = () => {
  const { cachedDate } = todayPrayerTimesStore.getState();
  return cachedDate === getTodayString();
};
