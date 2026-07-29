import { Button, ButtonText } from "@/src/components/button";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { scheduleOne } from "@/src/notifications/scheduler/schedule-one";
import type { PrayerName } from "@/src/store/notifications";
import { StyleSheet, View } from "react-native";
const TestNotification = () => {
  const handleTestNotification = async (prayer: PrayerName) => {
    console.log(`Test notification for ${prayer} triggered.`);
    await scheduleOne("today", prayer, Date.now() + 5000);
  };
  if (process.env.EXPO_PUBLIC_STAGE === "prod") return null;
  return (
    <View>
      <Text>Test Notification</Text>
      <VStack className="gap-2">
        <Button onPress={() => handleTestNotification("maghrib")}>
          <ButtonText> Test Maghrib Notification</ButtonText>
        </Button>
        <Button onPress={() => handleTestNotification("isha")}>
          <ButtonText> Test Isha Notification</ButtonText>
        </Button>
      </VStack>
    </View>
  );
};

export default TestNotification;

const styles = StyleSheet.create({});
