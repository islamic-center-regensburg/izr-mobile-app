// hooks/use-next-prayer.ts
import { useCountdown } from "@/src/hooks/use-countdown";
import { useEffect, useState } from "react";
import { computeNextPrayer, NextPrayerInfo } from "./compute-next-prayer";
import { usePrayerTimes } from "./use-prayer-times";

interface UseNextPrayerResult {
  nextPrayer:
    | (NextPrayerInfo & {
        countdown: ReturnType<typeof useCountdown>;
      })
    | null;
  isLoading: boolean;
  showTomorrowPrayers: boolean;
}

export const useNextPrayer = (): UseNextPrayerResult => {
  const { prayerTimes: today, isLoading: isTodayLoading } =
    usePrayerTimes("today");
  const { prayerTimes: tomorrow, isLoading: isTomorrowLoading } =
    usePrayerTimes("tomorrow");

  const [nextPrayerInfo, setNextPrayerInfo] = useState<NextPrayerInfo | null>(
    null,
  );

  // Recompute when prayer data changes OR when current target expires
  useEffect(() => {
    setNextPrayerInfo(computeNextPrayer(today, tomorrow));
  }, [today, tomorrow]);

  const countdown = useCountdown(nextPrayerInfo?.targetDate ?? null);

  // When countdown hits 0, recompute next prayer
  useEffect(() => {
    if (countdown.isExpired && nextPrayerInfo) {
      setNextPrayerInfo(computeNextPrayer(today, tomorrow));
    }
  }, [countdown.isExpired, today, tomorrow]);

  return {
    nextPrayer: nextPrayerInfo ? { ...nextPrayerInfo, countdown } : null,
    isLoading: isTodayLoading || isTomorrowLoading || !nextPrayerInfo,
    showTomorrowPrayers: nextPrayerInfo?.isTomorrow ?? false,
  };
};
