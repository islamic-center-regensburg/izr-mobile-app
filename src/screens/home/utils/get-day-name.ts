import { SupportedLanguage } from "@/src/store/lang";

const LOCALE_MAP: Record<SupportedLanguage, string> = {
  en: "en-US",
  de: "de-DE",
  ar: "ar-EG", // or ar-EG / ar depending on which Arabic date conventions you want
};

export const getDayNameFromDate = (
  date: string | undefined,
  lang: SupportedLanguage = "en",
): string => {
  if (!date) return "";
  const [day, month, year] = date.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString(LOCALE_MAP[lang], { weekday: "long" });
};