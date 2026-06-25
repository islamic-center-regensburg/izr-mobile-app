// stores/prayer-times-store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { PrayerTimes } from "../api";
import { getTodayString, isCacheValid } from "./common";

export type PrayerTimesDay = "today" | "tomorrow";

interface DayState {
  prayerTimes: PrayerTimes | null;
  cachedDate: string | null;
}

interface PrayerTimesState {
  today: DayState;
  tomorrow: DayState;
  hydrated: boolean;
  setPrayerTimes: (prayerTimes: PrayerTimes, day: PrayerTimesDay) => void;
  clearPrayerTimes: (day?: PrayerTimesDay) => void;
  getPrayerTimes: (day: PrayerTimesDay) => PrayerTimes | null;
}

const initialDayState: DayState = {
  prayerTimes: null,
  cachedDate: null,
};

const prayerTimesStore = create<PrayerTimesState>()(
  persist(
    (set, get) => ({
      today: initialDayState,
      tomorrow: initialDayState,
      hydrated: false,

      setPrayerTimes: (prayerTimes, day) =>
        set((state) => ({
          [day]: {
            prayerTimes,
            cachedDate: getTodayString(),
          },
        })),

      clearPrayerTimes: (day) =>
        set((state) =>
          day
            ? { [day]: initialDayState }
            : { today: initialDayState, tomorrow: initialDayState },
        ),

      getPrayerTimes: (day) => get()[day].prayerTimes,
    }),
    {
      name: "st-prayer-times",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const usePrayerTimesStore = () => prayerTimesStore((s) => s);

export const usePrayerTimesForDay = (day: PrayerTimesDay) =>
  prayerTimesStore((s) => s[day]);

export const isPrayerTimesCacheValid = (day: PrayerTimesDay) => {
  const state = prayerTimesStore.getState();
  return isCacheValid({ getState: () => state[day] } as any);
};
