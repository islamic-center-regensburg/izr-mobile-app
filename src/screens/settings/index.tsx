// screens/settings/index.tsx

import { FontSizeSwitcher } from "@/src/components/font-size-switcher";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { SupportedLanguage, useLangStore } from "@/src/store/lang";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { AppScreen } from "../app-screen";

const LANGUAGES: { label: string; value: SupportedLanguage }[] = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "العربية", value: "ar" },
];

export function SettingsScreen() {
  const { t } = useTranslation();
  const { lang, setLang } = useLangStore();

  return (
    <AppScreen>
      <View className="flex-1 px-4 gap-6 py-4">
        <View className="gap-2">
          <Heading className="px-1">{t("settings.fontSize")}</Heading>
          <FontSizeSwitcher />
        </View>

        <View className="gap-2">
          <Heading className="px-1">{t("settings.language")}</Heading>
          <HStack className="flex-row gap-2 p-2">
            {LANGUAGES.map((l) => {
              const isActive = lang === l.value;
              return (
                <Pressable
                  key={l.value}
                  onPress={() => setLang(l.value)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={l.label}
                  className={[
                    "items-center justify-center",
                    "rounded-lg px-3 py-2",
                    "border",
                    isActive
                      ? "bg-primary-500 border-primary-500"
                      : "bg-background-0 border-outline-200",
                  ].join(" ")}
                >
                  <Text
                    className={[
                      "font-medium",
                      isActive ? "text-typography-0" : "text-typography-600",
                    ].join(" ")}
                  >
                    {l.label}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        </View>
      </View>
    </AppScreen>
  );
}
