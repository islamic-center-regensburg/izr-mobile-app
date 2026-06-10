import { use } from "i18next";
import { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import i18n, { resources } from "../i18n";
import { useLangStore } from "../store/lang";

export function I18nSync() {
  const { lang } = useLangStore();

  useEffect(() => {
    use(initReactI18next).init({
      compatibilityJSON: "v4",
      resources,
      lng: "de",
      fallbackLng: "de",
      interpolation: {
        escapeValue: false,
      },
    });
  }, []);

  useEffect(() => {
    if (!i18n.isInitialized) return;

    const current = i18n.resolvedLanguage || i18n.language;
    if (current === lang) return;

    void i18n.changeLanguage(lang);
  }, [lang]);

  return null;
}
