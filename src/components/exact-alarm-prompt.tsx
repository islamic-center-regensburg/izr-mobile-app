import * as Notifications from "expo-notifications";
import { useTranslation } from "react-i18next";

import { useExactAlarmPrompt } from "../hooks/use-exact-alarm-prompt";
import { useNotificationScheduler } from "../hooks/use-notification-scheduler";
import { openExactAlarmSettings, setupNotifications } from "../notifications";
import { useNotificationSettingsStore } from "../store/notification-settings";
import { useNotificationsSchedulerStore } from "../store/notifications";
import { Button, ButtonText } from "./button";
import { Heading } from "./heading";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalFooter,
} from "./modal";
import { Text } from "./text";
import { VStack } from "./vstack";

export function ExactAlarmPrompt() {
  const { t } = useTranslation();
  const { visible, dismiss } = useExactAlarmPrompt();
  const { setExactAlarmAccessGranted } = useNotificationSettingsStore();
  const { rescheduleAll } = useNotificationScheduler();
  const { clearAll } = useNotificationsSchedulerStore();

  const handleConfirm = async () => {
    dismiss();
    await openExactAlarmSettings();
    await setupNotifications();
    await Notifications.cancelAllScheduledNotificationsAsync();
    clearAll();
    setExactAlarmAccessGranted(true);
    await rescheduleAll();
  };

  return (
    <Modal isOpen={visible} onClose={dismiss}>
      <ModalBackdrop />
      <ModalContent>
        <Heading size="lg">{t("notifications.exactAlarm.title")}</Heading>
        <ModalBody>
          <VStack space="sm">
            <Text>{t("notifications.exactAlarm.body")}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onPress={dismiss} className="flex-1">
            <ButtonText>{t("notifications.exactAlarm.dismiss")}</ButtonText>
          </Button>
          <Button onPress={handleConfirm} className="flex-1">
            <ButtonText className="text-center">
              {t("notifications.exactAlarm.openSettings")}
            </ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
