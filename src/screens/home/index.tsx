import { Heading } from "@/src/components/heading";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { AppScreen } from "../app-screen";

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <AppScreen>
      <View className="flex-1 p-5">
        <VStack className="mb-10">
          <Text className="font-sans-regular text-center">
            {t("common.izr")}
          </Text>
          <Heading size="3xl" className="text-center">
            {t("common.izr")}
          </Heading>
        </VStack>
        <VStack></VStack>
      </View>
    </AppScreen>
  );
};

export default HomeScreen;
