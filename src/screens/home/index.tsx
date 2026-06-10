import { Button, ButtonText } from "@/src/components/button";
import { FontSizeSwitcher } from "@/src/components/font-size-switcher";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useLangStore } from "@/src/store/lang";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { AppScreen } from "../app-screen";

const HomeScreen = () => {
  const { setLang } = useLangStore();
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
        <HStack space="sm" className="mb-10 mx-auto">
          <Button onPress={() => setLang("en")}>
            <ButtonText>English</ButtonText>
          </Button>
          <Button onPress={() => setLang("ar")}>
            <ButtonText>العربية</ButtonText>
          </Button>
          <Button onPress={() => setLang("de")}>
            <ButtonText>Deutsch</ButtonText>
          </Button>
        </HStack>
        <VStack>
          <View className="mx-auto">
            <FontSizeSwitcher />
          </View>
        </VStack>
      </View>
    </AppScreen>
  );
};

export default HomeScreen;
