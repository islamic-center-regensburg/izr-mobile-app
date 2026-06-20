// screens/settings/index.tsx

import { NestedKeyOf, TranslationKeys } from "@/i18n-env";
import { Divider } from "@/src/components/divider";
import Glassy from "@/src/components/glassy";
import { HStack } from "@/src/components/hstack";
import { StorageDebug } from "@/src/components/storage-debug";
import { Text } from "@/src/components/text";
import { useRTL } from "@/src/hooks/use-rtl";
import { RelativePathString, router } from "expo-router";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { AppScreen } from "../app-screen";

type SettingItem = {
  label: NestedKeyOf<TranslationKeys>;
  route: RelativePathString;
};

export function SettingsScreen() {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  const settings: SettingItem[] = [
    {
      label: "settings.fontSize",
      route: "/(modals)/font-size" as RelativePathString,
    },
    {
      label: "settings.language",
      route: "/(modals)/language" as RelativePathString,
    },
  ];

  return (
    <AppScreen>
      <View className="flex-1 px-4 py-4">
        <View className="rounded-xl overflow-hidden">
          {settings.map((setting, index) => (
            <Glassy key={setting.route} style={{ marginBottom: 5 }}>
              <Pressable
                onPress={() => router.navigate(setting.route)}
                className="active:opacity-70"
              >
                <HStack className="items-center justify-between px-4 py-4">
                  <Text>{t(setting.label)}</Text>
                  {isRTL ? (
                    <ChevronLeft size={18} className="text-neutral-400" />
                  ) : (
                    <ChevronRight size={18} className="text-neutral-400" />
                  )}
                </HStack>
              </Pressable>
            </Glassy>
          ))}
          <Divider className="my-4" />
          <StorageDebug />
        </View>
      </View>
    </AppScreen>
  );
}
