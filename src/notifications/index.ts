// src/notifications/index.ts
import Constants from "expo-constants";
import * as IntentLauncher from "expo-intent-launcher";
import * as Notifications from "expo-notifications";
import { AppState, AppStateStatus, Platform } from "react-native";
import { getNotificationSettingsState } from "../store/notification-settings";

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

/**
 * Android 12+ requires the user to explicitly grant "Alarms & reminders"
 * access (SCHEDULE_EXACT_ALARM) for exact-time notifications — e.g. Fajr —
 * to fire on schedule rather than being deferred within a multi-hour
 * window by Doze / battery optimization.
 *
 * There is no JS API to directly query or request this permission — the
 * only path is deep-linking to the system settings screen and letting the
 * user toggle it there. We only auto-prompt once (first run, tracked via
 * the notification-settings store); after that, expose a manual entry
 * point in notification settings for recovery.
 */
export async function requestExactAlarmAccessIfNeeded() {
  if (Platform.OS !== "android") return;

  const { exactAlarmAccessGranted, setExactAlarmAccessGranted } =
    getNotificationSettingsState();
  if (exactAlarmAccessGranted) return;

  setExactAlarmAccessGranted(true);
  await openExactAlarmSettings();
}

/**
 * Opens the system "Alarms & reminders" settings screen for this app.
 *
 * Since there's no JS API to verify the permission was actually granted,
 * we optimistically mark it as granted in the notification-settings store
 * once the user returns to the app (foreground) after this screen was
 * opened. This is best-effort tracking, not a verified OS-level check —
 * the user could return without actually toggling it on.
 */
export async function openExactAlarmSettings() {
  if (Platform.OS !== "android") return;

  const packageName = Constants.expoConfig?.android?.package;

  const markGrantedOnReturn = (nextState: AppStateStatus) => {
    if (nextState === "active") {
      getNotificationSettingsState().setExactAlarmAccessGranted(true);
      subscription.remove();
    }
  };

  const subscription = AppState.addEventListener("change", markGrantedOnReturn);

  try {
    await IntentLauncher.startActivityAsync(
      "android.settings.REQUEST_SCHEDULE_EXACT_ALARM",
    );
  } catch {
    // Some OEMs / older Android versions don't support this intent —
    // fall back to the general app details settings screen instead.
    if (packageName) {
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS,
        { data: `package:${packageName}` },
      );
    } else {
      // Neither intent could be launched — nothing to listen for.
      subscription.remove();
    }
  }
}

export async function setupNotifications() {
  configureNotificationHandler();
  await configureNotificationChannels();
}
