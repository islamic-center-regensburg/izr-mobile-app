import * as Notifications from "expo-notifications";
import { useCallback, useEffect } from "react";
import { PrayerTimes } from "../api";
import { getTodayString } from "../store/common";
import {
  getNotificationsSchedulerState,
  NotificationDay,
  notificationsSchedulerActions,
  PrayerName,
} from "../store/notifications";
import { usePrayerTimesForDay } from "../store/prayer-times";

const NOTIFIABLE_PRAYERS: PrayerName[] = [
  "fajr",
  "dhuhr",
  "asr",
  "maghrib",
  "isha",
];

function getPrayerTimestamp(
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

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function cancelExisting(day: NotificationDay, prayer: PrayerName) {
  const existing = getNotificationsSchedulerState().getNotification(
    day,
    prayer,
  );
  if (existing?.notificationId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(
        existing.notificationId,
      );
    } catch {
      // already fired or cancelled — safe to ignore
    }
  }
}

async function scheduleOne(
  day: NotificationDay,
  prayer: PrayerName,
  timestamp: number,
) {
  await cancelExisting(day, prayer);

  if (timestamp <= Date.now()) {
    notificationsSchedulerActions.removeNotification(day, prayer);
    return;
  }

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: `${capitalize(prayer)} Prayer`,
        body: `It's time for ${capitalize(prayer)} prayer.`,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(timestamp),
      },
    });

    notificationsSchedulerActions.upsertNotification({
      notificationId,
      prayer,
      day,
      triggerTimestamp: timestamp,
      status: "scheduled",
    });
  } catch {
    notificationsSchedulerActions.upsertNotification({
      notificationId: "",
      prayer,
      day,
      triggerTimestamp: timestamp,
      status: "failed",
    });
  }
}

async function schedulePrayerNotificationsForDay(
  day: NotificationDay,
  prayerTimes: PrayerTimes | null,
) {
  if (!prayerTimes) return;

  await Promise.all(
    NOTIFIABLE_PRAYERS.map((prayer) => {
      const ts = getPrayerTimestamp(prayerTimes, prayer, day);
      return ts === null ? Promise.resolve() : scheduleOne(day, prayer, ts);
    }),
  );
}

export function useNotificationScheduler() {
  const { prayerTimes: todayTimes } = usePrayerTimesForDay("today");
  const { prayerTimes: tomorrowTimes } = usePrayerTimesForDay("tomorrow");

  const runScheduling = useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const req = await Notifications.requestPermissionsAsync();
      if (req.status !== "granted") return;
    }

    await Promise.all([
      schedulePrayerNotificationsForDay("today", todayTimes),
      schedulePrayerNotificationsForDay("tomorrow", tomorrowTimes),
    ]);

    const stamp = getTodayString();
    notificationsSchedulerActions.setLastScheduledDate("today", stamp);
    notificationsSchedulerActions.setLastScheduledDate("tomorrow", stamp);
  }, [todayTimes, tomorrowTimes]);

  useEffect(() => {
    if (!todayTimes && !tomorrowTimes) return;
    const state = getNotificationsSchedulerState();
    if (!state.isDayStale("today") && !state.isDayStale("tomorrow")) return;
    runScheduling();
  }, [todayTimes, tomorrowTimes, runScheduling]);

  return { rescheduleAll: runScheduling };
}
