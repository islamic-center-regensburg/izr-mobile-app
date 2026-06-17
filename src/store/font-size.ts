// store/font-size.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { WithHydration } from "./common";

export type FontSizeScale = "sm" | "md" | "lg";

interface FontSizeStore extends WithHydration {
  scale: FontSizeScale;
  setScale: (scale: FontSizeScale) => void;
}

export const FONT_SCALE = {
  sm: 1,
  md: 1.2,
  lg: 1.4,
} as const;

export const fontSizeStore = create<FontSizeStore>()(
  persist(
    (set) => ({
      scale: "sm",
      hydrated: false,
      setScale: (scale) => set({ scale }),
    }),
    {
      name: "st-font-size",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export const useFontSizeStore = () => fontSizeStore((s) => s);
