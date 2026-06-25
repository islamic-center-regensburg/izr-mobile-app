import Glassy from "@/src/components/glassy";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import { usePrayerTimes } from "../hooks/use-prayer-times";
interface CurrentDateProps {
  prayerTimesDay: PrayerTimesDay;
}
const CurrentDate = (props: CurrentDateProps) => {
  const { prayerTimes, isLoading } = usePrayerTimes(props.prayerTimesDay);
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <Glassy style={{ height: "15%", justifyContent: "center" }}>
        <ActivityIndicator size={20} />
      </Glassy>
    );
  }
  return (
    <Glassy style={{ padding: 10 }}>
      <VStack className="w-full items-center bg-transparent">
        <Text>{t(`home-screen.${props.prayerTimesDay}`)}</Text>
        <HStack className="w-full justify-between">
          <Text className="text-black">{t("home-screen.hijri-date")}</Text>
          <Text className="text-black">{prayerTimes?.hijri_date}</Text>
        </HStack>
        <HStack className="w-full justify-between">
          <Text className="text-black">{t("home-screen.gregorian-date")}</Text>
          <Text className="text-black">{prayerTimes?.gregorian_date}</Text>
        </HStack>
      </VStack>
    </Glassy>
  );
};

export default CurrentDate;
