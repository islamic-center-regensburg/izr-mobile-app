import { PrayerNameKey } from "@/src/api";
import { useEffect, useRef, useState } from "react";
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

interface UseNextPrayerResult {
  nextPrayer: NextPrayer | null;
  isLoading: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

const parseTimeToDate = (timeStr: string, baseDate: Date): Date => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const PRAYER_NAMES_ORDER: Exclude<PrayerNameKey, "jumah">[] = [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

export const useNextPrayer = (): UseNextPrayerResult => {
  const { prayerTimes, isLoading: isPrayerTimesLoading } = usePrayerTimes();
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);

  const prayerTimesRef = useRef(prayerTimes);
  useEffect(() => {
    prayerTimesRef.current = prayerTimes;
  }, [prayerTimes]);

  useEffect(() => {
    if (!prayerTimes) return;

    const computeNextPrayer = (): NextPrayer | null => {
      const currentPrayerTimes = prayerTimesRef.current;
      if (!currentPrayerTimes) return null;

      const now = new Date();

      for (const name of PRAYER_NAMES_ORDER) {
        const prayerDate = parseTimeToDate(currentPrayerTimes[name], now);
        if (prayerDate > now) {
          const diffSeconds = Math.floor(
            (prayerDate.getTime() - now.getTime()) / 1000,
          );
          return {
            name,
            time: currentPrayerTimes[name],
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
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const fajrTomorrow = parseTimeToDate(
        currentPrayerTimes["fajr"],
        tomorrow,
      );
      const diffSeconds = Math.floor(
        (fajrTomorrow.getTime() - now.getTime()) / 1000,
      );

      return {
        name: "fajr",
        time: currentPrayerTimes["fajr"],
        countdown: {
          hours: pad(Math.floor(diffSeconds / 3600)),
          minutes: pad(Math.floor((diffSeconds % 3600) / 60)),
          seconds: pad(diffSeconds % 60),
        },
        totalSeconds: diffSeconds,
      };
    };

    const interval = setInterval(() => {
      setNextPrayer(computeNextPrayer());
    }, 1000);

    return () => clearInterval(interval);
  }, [prayerTimes]);

  return {
    nextPrayer,
    isLoading: isPrayerTimesLoading || nextPrayer === null,
  };
};
