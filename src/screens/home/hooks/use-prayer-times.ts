// hooks/use-prayer-times.ts
import { getMosquesQueryOptions } from "@/src/api/mosque/queries";
import { getPrayerTimesForMosqueQueryOptions } from "@/src/api/prayer_times/queries";
import { useMosqueStore } from "@/src/store/mosque";
import {
  isTodayPrayerTimesCacheValid,
  useTodayPrayerTimesStore,
} from "@/src/store/today-prayer-times";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function usePrayerTimes() {
  const { mosque: izrMosqueName } = useMosqueStore();
  const { prayerTimes, setPrayerTimes, hydrated } = useTodayPrayerTimesStore();

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // ── Step 1: fetch mosque ──────────────────────────────────────────
  const { data: mosques, ...mosquesQuery } = useQuery(
    getMosquesQueryOptions({ query: { name: izrMosqueName } }),
  );

  const izrMosque = mosques?.data[0];

  // ── Step 2: fetch prayer times only if cache is invalid ───────────
  const { data: fetchedPrayerTimes, ...prayerTimesQuery } = useQuery({
    ...getPrayerTimesForMosqueQueryOptions({
      mosque_id: izrMosque?.id ?? "",
      query: { year, month, day, source: "stored" },
    }),
    enabled: !!izrMosque?.id && hydrated && !isTodayPrayerTimesCacheValid(),
  });

  // ── Step 3: sync fetched data → zustand store ─────────────────────
  useEffect(() => {
    if (!fetchedPrayerTimes?.length) return;

    const todayPrayerTimes = fetchedPrayerTimes[0];
    setPrayerTimes(todayPrayerTimes);
  }, [fetchedPrayerTimes, setPrayerTimes]);

  // ── Step 4: resolve final prayer times (cache or fresh) ───────────
  const resolvedPrayerTimes = isTodayPrayerTimesCacheValid()
    ? prayerTimes
    : (fetchedPrayerTimes?.[0] ?? null);

  return {
    mosque: izrMosque,
    prayerTimes: resolvedPrayerTimes,
    isLoading:
      !hydrated || mosquesQuery.isLoading || prayerTimesQuery.isLoading,
    isError: mosquesQuery.isError || prayerTimesQuery.isError,
    error: mosquesQuery.error ?? prayerTimesQuery.error,
  };
}
