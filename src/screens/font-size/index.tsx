// screens/settings/index.tsx

import { Heading } from "@/src/components/heading";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { FontSizeSwitcher } from "@/src/screens/font-size/components/font-size-switcher";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export function FontSizeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 px-4 gap-6 py-4 bg-white">
      <View className="gap-2">
        <Text className="px-1 font-sans-medium">{t("settings.fontSize")}</Text>
        <FontSizeSwitcher />
      </View>
      <VStack>
        <Heading> {t("font-size-screen.test-heading")} </Heading>
        <Text>{t("font-size-screen.test-text")}</Text>
      </VStack>
    </View>
  );
}
