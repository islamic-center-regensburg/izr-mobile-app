import { PrayerTimes } from "@/src/api";
import { NotificationDay, PrayerName } from "@/src/store/notifications";

export function getPrayerTimestamp(
  prayerTimes: PrayerTimes,
  prayer: PrayerName,
  day: NotificationDay,
): number | null {
  const value = (prayerTimes as any)[prayer] as string | undefined;
  if (!value) return null;

  const match = /^([0-1]?\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!match) return null;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  const base = new Date();
  base.setHours(0, 0, 0, 0);
  if (day === "tomorrow") {
    base.setDate(base.getDate() + 1);
  }
  base.setHours(hours, minutes, 0, 0);

  return base.getTime();
}
