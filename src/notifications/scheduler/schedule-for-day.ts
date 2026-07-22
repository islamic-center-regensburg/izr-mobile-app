import { PrayerTimes } from "@/src/api";
import { getNotificationSettingsState } from "@/src/store/notification-settings";
import {
  NotificationDay,
  notificationsSchedulerActions,
} from "@/src/store/notifications";
import { cancelExisting } from "./cancel-exisiting";
import { NOTIFIABLE_PRAYERS } from "./constants";
import { scheduleOne } from "./schedule-one";
import { getPrayerTimestamp } from "./utils";

export async function schedulePrayerNotificationsForDay(
  day: NotificationDay,
  prayerTimes: PrayerTimes | null,
) {
  if (!prayerTimes) return;
  const { enabled } = getNotificationSettingsState();

  await Promise.all(
    NOTIFIABLE_PRAYERS.map(async (prayer) => {
      if (!enabled[prayer]) {
        await cancelExisting(day, prayer);
        notificationsSchedulerActions.removeNotification(day, prayer);
        return;
      }
      const ts = getPrayerTimestamp(prayerTimes, prayer, day);
      if (ts !== null) await scheduleOne(day, prayer, ts);
    }),
  );
}
