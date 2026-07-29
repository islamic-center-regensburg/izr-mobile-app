import { PrayerName as APIPrayerName } from "@/src/api/gen";
import i18n from "@/src/i18n";
import { langStore } from "@/src/store/lang";
import {
  NotificationDay,
  notificationsSchedulerActions,
  PrayerName,
} from "@/src/store/notifications";
import * as Notifications from "expo-notifications";
import { ADHAN_CHANNEL_ID, DEFAULT_CHANNEL_ID } from "..";
import { cancelExisting } from "./cancel-exisiting";

export async function scheduleOne(
  day: NotificationDay,
  prayer: PrayerName,
  timestamp: number,
) {
  await cancelExisting(day, prayer);

  if (timestamp <= Date.now()) {
    notificationsSchedulerActions.removeNotification(day, prayer);
    return;
  }

  console.log(
    `Scheduling notification for ${day} ${prayer} at ${new Date(timestamp).toLocaleTimeString()}`,
  );

  const isShuruq = prayer === "shuruq";
  const lang = langStore.getState().lang;
  const prayerLabel = i18n.t(
    `common.prayer-names.${prayer as APIPrayerName | "shuruq"}`,
    {
      lng: lang,
    },
  );

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: isShuruq
          ? prayerLabel
          : i18n.t("notifications.adhanTitle", {
              lng: lang,
              prayer: prayerLabel,
            }),
        body: isShuruq
          ? ""
          : i18n.t("notifications.adhanBody", {
              lng: lang,
              prayer: prayerLabel,
            }),
        sound: isShuruq ? "default" : "abdul_basit.wav",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(timestamp),
        channelId: isShuruq ? DEFAULT_CHANNEL_ID : ADHAN_CHANNEL_ID,
      },
    });

    notificationsSchedulerActions.upsertNotification({
      notificationId,
      prayer,
      day,
      triggerTimestamp: timestamp,
      triggerTimeString: new Date(timestamp).toLocaleTimeString(),
      status: "scheduled",
    });
  } catch {
    notificationsSchedulerActions.upsertNotification({
      notificationId: "",
      prayer,
      day,
      triggerTimestamp: timestamp,
      triggerTimeString: new Date(timestamp).toLocaleTimeString(),
      status: "failed",
    });
  }
}

export async function scheduleTestNotification(minutesFromNow = 3) {
  const timestamp = Date.now() + minutesFromNow * 60 * 1000;
  await scheduleOne("today", "fajr", timestamp);
  console.log("Scheduled for:", new Date(timestamp).toString());
}
