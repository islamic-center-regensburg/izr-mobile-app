// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar";
import de from "./locales/de";
import en from "./locales/en";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  de: { translation: de },
} as const;

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  resources,
  lng: "de",
  fallbackLng: "de",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
