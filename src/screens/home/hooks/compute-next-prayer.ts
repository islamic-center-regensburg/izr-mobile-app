// utils/compute-next-prayer.ts
import { PrayerNameKey, PrayerTimes } from "@/src/api";

export interface NextPrayerInfo {
  name: PrayerNameKey;
  time: string;
  targetDate: Date;
  isTomorrow: boolean;
}

const PRAYER_NAMES_ORDER: Exclude<PrayerNameKey, "jumah">[] = [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

const parseTimeToDate = (timeStr: string, baseDate: Date): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const computeNextPrayer = (
  todayPrayers: PrayerTimes | null,
  tomorrowPrayers: PrayerTimes | null,
  now: Date = new Date(),
): NextPrayerInfo | null => {
  if (!todayPrayers) return null;

  // Check today's prayers
  for (const name of PRAYER_NAMES_ORDER) {
    const targetDate = parseTimeToDate(todayPrayers[name], now);
    if (targetDate > now) {
      return {
        name,
        time: todayPrayers[name],
        targetDate,
        isTomorrow: false,
      };
    }
  }

  // Isha passed → use tomorrow's Fajr
  const fajrTime = tomorrowPrayers?.fajr ?? todayPrayers.fajr;
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);

  return {
    name: "fajr",
    time: fajrTime,
    targetDate: parseTimeToDate(fajrTime, tomorrowDate),
    isTomorrow: true,
  };
};
