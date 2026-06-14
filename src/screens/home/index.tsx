import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { StorageDebug } from "@/src/components/storage-debug";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { AppScreen } from "../app-screen";
import { usePrayerTimes } from "./hooks/use-prayer-times";

const HomeScreen = () => {
  const { t } = useTranslation();
  const { mosque, prayerTimes } = usePrayerTimes();
  return (
    <AppScreen>
      <View className="flex-1 p-5">
        <Glassy>
          <VStack className="mb-10">
            <Text className="font-sans-regular text-center">
              {t("common.izr")}
            </Text>
            <Heading size="3xl" className="text-center">
              {t("common.izr")}
            </Heading>
          </VStack>
        </Glassy>
        <StorageDebug />
      </View>
    </AppScreen>
  );
};

export default HomeScreen;
