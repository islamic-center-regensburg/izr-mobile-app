import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const DEFAULT_FONT_SIZE = 16;

interface FontSizeState {
  fontSize: number;
  setFontSize: (size: number) => void;
  resetFontSize: () => void;
}

const fontSizeStore = create<FontSizeState>()(
  persist(
    (set) => ({
      fontSize: DEFAULT_FONT_SIZE,
      resetFontSize: () => set({ fontSize: DEFAULT_FONT_SIZE }),
      setFontSize: (size: number) => set({ fontSize: size }),
    }),
    {
      name: "st-font-size",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useFontSizeStore = () => fontSizeStore((s) => s);
