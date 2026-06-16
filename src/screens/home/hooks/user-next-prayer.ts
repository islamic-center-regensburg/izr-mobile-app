import { PrayerNameKey } from "@/src/api";
import { useEffect, useState } from "react";
import { usePrayerTimes } from "./use-prayer-times";

interface NextPrayer {
  name: PrayerNameKey;
  time: string;
  countdown: {
    hours: string;
    minutes: string;
    seconds: string;
  };
  totalSeconds: number;
}

const pad = (n: number) => String(n).padStart(2, "0");

const parseTimeToDate = (timeStr: string, baseDate: Date): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const useNextPrayer = (): NextPrayer | null => {
  const { prayerTimes } = usePrayerTimes();
  const prayerNamesOrder: Exclude<PrayerNameKey, "jumah">[] = [
    "fajr",
    "dhuhr",
    "asr",
    "maghrib",
    "isha",
  ];

  const [countdown, setCountdown] = useState<NextPrayer | null>(null);

  useEffect(() => {
    if (!prayerTimes) return;

    const computeNextPrayer = (): NextPrayer | null => {
      const now = new Date();

      // Find the next prayer today
      for (const name of prayerNamesOrder) {
        const prayerDate = parseTimeToDate(prayerTimes[name], now);
        if (prayerDate > now) {
          const diffSeconds = Math.floor(
            (prayerDate.getTime() - now.getTime()) / 1000,
          );
          return {
            name,
            time: prayerTimes[name],
            countdown: {
              hours: pad(Math.floor(diffSeconds / 3600)),
              minutes: pad(Math.floor((diffSeconds % 3600) / 60)),
              seconds: pad(diffSeconds % 60),
            },
            totalSeconds: diffSeconds,
          };
        }
      }

      // All prayers passed → next is Fajr of tomorrow
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fajrTomorrow = parseTimeToDate(prayerTimes["fajr"], tomorrow);

      const diffSeconds = Math.floor(
        (fajrTomorrow.getTime() - now.getTime()) / 1000,
      );

      return {
        name: "fajr",
        time: prayerTimes["fajr"],
        countdown: {
          hours: pad(Math.floor(diffSeconds / 3600)),
          minutes: pad(Math.floor((diffSeconds % 3600) / 60)),
          seconds: pad(diffSeconds % 60),
        },
        totalSeconds: diffSeconds,
      };
    };

    // Run immediately
    setCountdown(computeNextPrayer());

    // Update every second
    const interval = setInterval(() => {
      setCountdown(computeNextPrayer());
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return countdown;
};
