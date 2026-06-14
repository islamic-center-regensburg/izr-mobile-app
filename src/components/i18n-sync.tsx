import { useEffect } from "react";
import i18n from "../i18n";
import { useLangStore } from "../store/lang";

export function I18nSync() {
  const { lang } = useLangStore();
  useEffect(() => {
    if (!i18n.isInitialized) return;

    const current = i18n.resolvedLanguage || i18n.language;
    if (current === lang) return;

    void i18n.changeLanguage(lang);
  }, [lang]);

  return null;
}
