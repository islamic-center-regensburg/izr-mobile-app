// src/notifications/index.ts
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const DEFAULT_CHANNEL_ID = "default";
export const ADHAN_CHANNEL_ID = "adhan";

export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

export async function configureNotificationChannels() {
  if (Platform.OS !== "android") return;

  // Delete first — channel properties are locked after creation,
  // so re-creating with new settings only works if the old one is gone.
  await Notifications.deleteNotificationChannelAsync(ADHAN_CHANNEL_ID);

  await Notifications.setNotificationChannelAsync(DEFAULT_CHANNEL_ID, {
    name: "Default",
    importance: Notifications.AndroidImportance.DEFAULT,
  });

  await Notifications.setNotificationChannelAsync(ADHAN_CHANNEL_ID, {
    name: "Adhan",
    importance: Notifications.AndroidImportance.MAX,
    sound: "abdul_basit.wav",
  });
}

export async function setupNotifications() {
  configureNotificationHandler();
  await configureNotificationChannels();
}
