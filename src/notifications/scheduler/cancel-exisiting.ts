import {
  getNotificationsSchedulerState,
  NotificationDay,
  PrayerName,
} from "@/src/store/notifications";
import * as Notifications from "expo-notifications";

export async function cancelExisting(day: NotificationDay, prayer: PrayerName) {
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
