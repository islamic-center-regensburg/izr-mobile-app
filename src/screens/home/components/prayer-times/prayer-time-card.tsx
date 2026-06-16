import { PrayerNameKey } from "@/src/api";
import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

interface PrayerTimeCardProps {
  prayerNameKey: PrayerNameKey;
  prayerTime: string;
}

const PrayerTimeCard = (props: PrayerTimeCardProps) => {
  const { t } = useTranslation();
  return (
    <Glassy className="w-full" style={{ padding: 10 }}>
      <Heading size="2xl">
        {t(`common.prayer-names.${props.prayerNameKey}`)}
      </Heading>
      <HStack className="justify-between">
        <Text>{t("home-screen.adhan")}</Text>
        <Text>{props.prayerTime}</Text>
      </HStack>
      <HStack className="justify-between">
        <Text>{t("home-screen.iqama")}</Text>
        <Text>{props.prayerTime}</Text>
      </HStack>
    </Glassy>
  );
};

export default PrayerTimeCard;

const styles = StyleSheet.create({});
