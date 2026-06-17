// stores/today-prayer-times-store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IqamaTime } from "../api";
import { getTodayString, isCacheValid, WithCacheValidation } from "./common";

interface IqamaTimesState extends WithCacheValidation {
  iqamaTimes: IqamaTime[] | null;
  setIqamaTimes: (prayerTimes: IqamaTime[]) => void;
  clearIqamaTimes: () => void;
}

const iqamaTimesStore = create<IqamaTimesState>()(
  persist(
    (set) => ({
      iqamaTimes: null,
      hydrated: false,
      cachedDate: null,
      setIqamaTimes: (iqamaTimes) =>
        set({ iqamaTimes, cachedDate: getTodayString() }),
      clearIqamaTimes: () => set({ iqamaTimes: null, cachedDate: null }),
    }),
    {
      name: "st-iqama-times",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const useIqamaTimesStore = () => iqamaTimesStore((s) => s);
export const isIqamaTimesCacheValid = () => isCacheValid(iqamaTimesStore);
