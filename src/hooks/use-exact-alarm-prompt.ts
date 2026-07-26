import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useNotificationSettingsStore } from "../store/notification-settings";

/**
 * Decides whether to show the in-app "grant exact alarm access" explainer
 * modal. Shows once, on first launch on Android, before we send the user
 * off to the system settings screen — gives them context instead of an
 * unexplained settings jump.
 */
export function useExactAlarmPrompt() {
  const [visible, setVisible] = useState(false);
  const {
    hydrated,
    firstTimeExactAlarmAccessPrompted,
    setFirstTimeExactAlarmAccessPrompted,
  } = useNotificationSettingsStore();

  useEffect(() => {
    if (Platform.OS !== "android") return;
    if (!hydrated) return;
    if (firstTimeExactAlarmAccessPrompted) return;

    setVisible(true);
  }, [hydrated, firstTimeExactAlarmAccessPrompted]);

  const dismiss = () => {
    setFirstTimeExactAlarmAccessPrompted(true);
    setVisible(false);
  };

  return { visible, dismiss };
}
