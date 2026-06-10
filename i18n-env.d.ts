import type { resources } from "@/src/i18n";
import "i18next";

type TranslationKeys = typeof resources["en"]["translation"]

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: TranslationKeys;
    };
  }
}