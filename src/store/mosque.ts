// stores/mosque-store.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WithHydration } from "./common";

const DEFAULT_MOSQUE_NAME: string = "Islamisches Zentrum Regensburg";

interface MosqueState extends WithHydration {
  mosque: string;
  hydrated: boolean;
  setMosque: (name: string) => void;
  resetMosque: () => void;
}

const mosqueStore = create<MosqueState>()(
  persist(
    (set) => ({
      mosque: DEFAULT_MOSQUE_NAME,
      hydrated: false,
      setMosque: (name) => set({ mosque: name }),
      resetMosque: () => set({ mosque: DEFAULT_MOSQUE_NAME }),
    }),
    {
      name: "st-mosque",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const useMosqueStore = () => mosqueStore((s) => s);
