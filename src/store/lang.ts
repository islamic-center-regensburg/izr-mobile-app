import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SupportedLanguage = "en" | "ar" | "de";

const DEFAULT_LANG: SupportedLanguage = "de";

interface LangState {
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  resetLang: () => void;
}

const langStore = create<LangState>()(
  persist(
    (set) => ({
      lang: DEFAULT_LANG,
      hydrated: false,
      setLang: (lang) => set({ lang }),
      resetLang: () => set({ lang: DEFAULT_LANG }),
    }),
    {
      name: "st-lang",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const useLangStore = () => langStore((s) => s);
