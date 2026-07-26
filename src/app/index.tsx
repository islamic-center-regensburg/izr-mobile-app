import { Redirect } from "expo-router";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { Heading } from "../components/heading";
import { Text } from "../components/text";
import { useIqamaTimes } from "../screens/home/hooks/use-iqama-times";
import { usePrayerTimes } from "../screens/home/hooks/use-prayer-times";

function LoadingFallback() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 flex flex-col items-center justify-center gap-20 bg-white">
      <Heading className="w-1/2 text-center">{t("common.izr")}</Heading>
      <ActivityIndicator size="small" color="#6366f1" />
      <Text className="text-typography-500 text-center">
        {t("common.loading")}
      </Text>
    </View>
  );
}

function IndexRedirect() {
  usePrayerTimes("today");
  usePrayerTimes("tomorrow");
  useIqamaTimes();

  return <Redirect href="/home" />;
}

export default function Index() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <IndexRedirect />
    </Suspense>
  );
}
