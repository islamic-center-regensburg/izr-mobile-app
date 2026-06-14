import { Redirect } from "expo-router";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { Heading } from "../components/heading";

export default function Index() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 flex flex-col items-center justify-center gap-20 bg-white">
      <Heading className="w-1/2 text-center">{t("common.izr")}</Heading>
      <ActivityIndicator size="small" color="#6366f1"/>
      <Redirect href="/home" />
    </View>
  );
}
