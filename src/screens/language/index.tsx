// screens/settings/index.tsx

import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useRTL } from "@/src/hooks/use-rtl";
import { SupportedLanguage, useLangStore } from "@/src/store/lang";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

const LANGUAGES: { label: string; value: SupportedLanguage }[] = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "العربية", value: "ar" },
];

export function LanguageScreen() {
  const { t } = useTranslation();
  const { lang, setLang } = useLangStore();
  const { rtlClass } = useRTL();
  return (
    <View className="flex-1 px-4 gap-6 py-4 bg-white">
      <View className="gap-2">
        <Text className="px-1 font-sans-medium">{t("settings.fontSize")}</Text>
        <HStack className={cn("flex-row gap-2 p-2", rtlClass)}>
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
                  "rounded-2xl px-3 py-2",
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
      <VStack>
        <Heading> {t("font-size-screen.test-heading")} </Heading>
        <Text>{t("font-size-screen.test-text")}</Text>
      </VStack>
    </View>
  );
}
