import { PrayerName as APIPrayerName } from "@/src/api/gen";
import { Button, ButtonText } from "@/src/components/button";
import { Divider } from "@/src/components/divider";
import { HStack } from "@/src/components/hstack";
import { Switch } from "@/src/components/switch";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { colors } from "@/src/constants/colors";
import { NOTIFIABLE_PRAYERS } from "@/src/notifications/scheduler/constants";
import { ModalScreen } from "@/src/screens/common/modal-screen";
import { useNotificationSettingsStore } from "@/src/store/notification-settings";
import { PrayerName } from "@/src/store/notifications";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

function PrayerNotificationRow({ prayer }: { prayer: PrayerName }) {
  const { t } = useTranslation();
  const { enabled, setEnabled } = useNotificationSettingsStore();

  return (
    <HStack className="justify-between items-center py-1">
      <Text className="text-base">
        {t(`common.prayer-names.${prayer as APIPrayerName}`)}{" "}
      </Text>
      <Switch
        value={enabled[prayer]}
        onValueChange={(value) => setEnabled(prayer, value)}
        thumbColor={"white"}
        trackColor={{ true: colors.primary }}
      />
    </HStack>
  );
}

export function NotificationsScreen() {
  const { t } = useTranslation();
  const { exactAlarmAccessGranted } = useNotificationSettingsStore();
  const { setFirstTimeExactAlarmAccessPrompted } =
    useNotificationSettingsStore();

  return (
    <ModalScreen>
      <View className="flex-1 px-4 gap-6 py-4 bg-white">
        <View className="gap-2">
          <Text size="2xl" className="px-1 font-sans-medium">
            {t("notifications-screen.title")}
          </Text>
          <VStack space="md" className="px-1">
            {NOTIFIABLE_PRAYERS.map((prayer) => (
              <PrayerNotificationRow key={prayer} prayer={prayer} />
            ))}
          </VStack>

          {!exactAlarmAccessGranted && (
            <>
              <Divider className="border-t border-gray-300 my-4" />
              <VStack space="sm" className="px-1">
                <Text className="text-sm text-gray-500">
                  {t("notifications-screen.exact-alarm-warning")}
                </Text>
                <Button
                  onPress={() => setFirstTimeExactAlarmAccessPrompted(false)}
                >
                  <ButtonText>
                    {t("notifications-screen.exact-alarm-button")}
                  </ButtonText>
                </Button>
              </VStack>
            </>
          )}
        </View>
      </View>
    </ModalScreen>
  );
}
