import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useRef } from "react";
import { getTodayString } from "../store/common";
import { useNotificationSettingsStore } from "../store/notification-settings";
import {
  getNotificationsSchedulerState,
  notificationsSchedulerActions,
} from "../store/notifications";

import { schedulePrayerNotificationsForDay } from "../notifications/scheduler/schedule-for-day";
import { usePrayerTimesForDay } from "../store/prayer-times";

export function useNotificationScheduler() {
  const { prayerTimes: todayTimes } = usePrayerTimesForDay("today");
  const { prayerTimes: tomorrowTimes } = usePrayerTimesForDay("tomorrow");
  const { enabled, exactAlarmAccessGranted } = useNotificationSettingsStore();
  const prevEnabledRef = useRef(enabled);

  const runScheduling = useCallback(async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const req = await Notifications.requestPermissionsAsync();
      if (req.status !== "granted") return;
    }

    if (!exactAlarmAccessGranted) return;

    await Promise.all([
      schedulePrayerNotificationsForDay("today", todayTimes),
      schedulePrayerNotificationsForDay("tomorrow", tomorrowTimes),
    ]);

    const stamp = getTodayString();
    notificationsSchedulerActions.setLastScheduledDate("today", stamp);
    notificationsSchedulerActions.setLastScheduledDate("tomorrow", stamp);
  }, [todayTimes, tomorrowTimes, exactAlarmAccessGranted]);

  useEffect(() => {
    if (!todayTimes && !tomorrowTimes) return;

    const settingsChanged = prevEnabledRef.current !== enabled;
    prevEnabledRef.current = enabled;

    const state = getNotificationsSchedulerState();
    const dayStale = state.isDayStale("today") || state.isDayStale("tomorrow");

    if (!settingsChanged && !dayStale) return;

    runScheduling();
  }, [
    todayTimes,
    tomorrowTimes,
    enabled,
    exactAlarmAccessGranted,
    runScheduling,
  ]);

  return { rescheduleAll: runScheduling };
}
