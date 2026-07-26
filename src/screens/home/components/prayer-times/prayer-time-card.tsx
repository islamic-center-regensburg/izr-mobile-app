import { PrayerNameKey } from "@/src/api";
import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { useNextPrayer } from "../../hooks/user-next-prayer";

interface PrayerTimeCardProps {
  prayerNameKey: PrayerNameKey;
  prayerTime: string;
  iqamaTime: string;
  prayerTimesDay: PrayerTimesDay;
}

const PrayerTimeCard = (props: PrayerTimeCardProps) => {
  const { t } = useTranslation();
  const { nextPrayer } = useNextPrayer();
  const shouldHighlight =
    nextPrayer?.name === props.prayerNameKey &&
    props.prayerTimesDay === "today";
  const BgComponent = !shouldHighlight ? Glassy : View; // You can replace the second Glassy with another component if needed
  return (
    <BgComponent
      className="w-full"
      style={[
        { backgroundColor: shouldHighlight ? "rgba(39, 75, 64, 0.9)" : "" },
        styles.bg,
      ]}
    >
      <Heading size="2xl" className={cn(shouldHighlight && "text-white")}>
        {t(`common.prayer-names.${props.prayerNameKey}`)}
      </Heading>
      <HStack className="justify-between">
        <Text className={cn(shouldHighlight && "text-white")}>
          {t("home-screen.adhan")}
        </Text>
        <Text className={cn(shouldHighlight && "text-white")}>
          {props.prayerTime}
        </Text>
      </HStack>
      <HStack className="justify-between">
        <Text className={cn(shouldHighlight && "text-white")}>
          {t("home-screen.iqama")}
        </Text>
        <Text className={cn(shouldHighlight && "text-white")}>
          {props.iqamaTime}
        </Text>
      </HStack>
    </BgComponent>
  );
};

export default PrayerTimeCard;

const styles = StyleSheet.create({
  bg: {
    overflow: "hidden",
    padding: 10,
    borderRadius: 16,
  },
});
