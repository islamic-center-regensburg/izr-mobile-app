// hooks/use-iqama-times.ts
import { IqamaTime, PrayerTimes } from "@/src/api";
import { getPrayerIqamaQueryOptions } from "@/src/api/prayer_iqama/queries";
import {
  isIqamaTimesCacheValid,
  useIqamaTimesStore,
} from "@/src/store/iqama-times";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { usePrayerTimes } from "./use-prayer-times";

// ── Types ─────────────────────────────────────────────────────────────────────

type ResolvedIqamaTimes = {
  fajr: string | null;
  dhuhr: string | null;
  asr: string | null;
  maghrib: string | null;
  isha: string | null;
  jumah: string[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const addMinutesToTime = (time: string, minutes: number): string => {
  const [hours, mins] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, mins + minutes, 0, 0);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
};

const formatTime = (time: string) => {
  const [hours, mins] = time.split(":").map(Number);
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const resolveIqamaTimes = (
  iqamaTimes: IqamaTime[],
  prayerTimes: PrayerTimes,
): ResolvedIqamaTimes => {
  const result: ResolvedIqamaTimes = {
    fajr: null,
    dhuhr: null,
    asr: null,
    maghrib: null,
    isha: null,
    jumah: [],
  };

  for (const iqama of iqamaTimes) {
    const { prayer_name, mode, offset_minutes, fixed_time } = iqama;

    if (prayer_name === "jumah") {
      if (fixed_time) result.jumah.push(formatTime(fixed_time));
      continue;
    }

    if (mode === "fixed") {
      result[prayer_name] = fixed_time ?? null;
    } else if (mode === "offset") {
      const basePrayerTime = prayerTimes[prayer_name];
      result[prayer_name] =
        basePrayerTime && offset_minutes != null
          ? addMinutesToTime(basePrayerTime, offset_minutes)
          : null;
    }
  }

  return result;
};

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useIqamaTimes() {
  const { iqamaTimes, setIqamaTimes, hydrated } = useIqamaTimesStore();
  const {
    mosque,
    prayerTimes,
    isLoading: isPrayerTimesLoading,
    isError: isPrayerTimesError,
    error: prayerTimesError,
  } = usePrayerTimes("today");

  // ── Step 1: fetch iqama times only if cache is invalid ────────────
  const { data: fetchedIqamaTimes, ...iqamaTimesQuery } = useQuery({
    ...getPrayerIqamaQueryOptions(mosque?.id ?? ""),
    enabled: !!mosque?.id && hydrated && !isIqamaTimesCacheValid(),
  });

  // ── Step 2: sync fetched data → zustand store ─────────────────────
  useEffect(() => {
    if (!fetchedIqamaTimes?.length) return;
    setIqamaTimes(fetchedIqamaTimes);
  }, [fetchedIqamaTimes, setIqamaTimes]);

  // ── Step 3: resolve source (cache or fresh) ───────────────────────
  const resolvedIqamaTimes = isIqamaTimesCacheValid()
    ? iqamaTimes
    : (fetchedIqamaTimes ?? null);

  // ── Step 4: compute final iqama times ─────────────────────────────
  const computedIqamaTimes =
    resolvedIqamaTimes && prayerTimes
      ? resolveIqamaTimes(resolvedIqamaTimes, prayerTimes)
      : null;

  return {
    iqamaTimes: computedIqamaTimes,
    isLoading: !hydrated || isPrayerTimesLoading || iqamaTimesQuery.isLoading,
    isError: isPrayerTimesError || iqamaTimesQuery.isError,
    error: prayerTimesError ?? iqamaTimesQuery.error,
  };
}
