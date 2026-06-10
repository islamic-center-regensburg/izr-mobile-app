import i18n from "i18next";
import ar from "./locales/ar";
import de from "./locales/de";
import en from "./locales/en";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  de: { translation: de },
} as const;

export default i18n;
