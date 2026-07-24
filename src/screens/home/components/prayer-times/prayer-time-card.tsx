import { PrayerNameKey } from "@/src/api";
import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { useTranslation } from "react-i18next";
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
  const shouldHighlight = nextPrayer?.name === props.prayerNameKey && props.prayerTimesDay === "today";
  return (
    <Glassy className="w-full" style={{ padding: 10, backgroundColor: shouldHighlight ? "rgb(39, 75, 64)" : "" }}>
      <Heading size="2xl">
        {t(`common.prayer-names.${props.prayerNameKey}`)}
      </Heading>
      <HStack className="justify-between">
        <Text>{t("home-screen.adhan")}</Text>
        <Text>{props.prayerTime}</Text>
      </HStack>
      <HStack className="justify-between">
        <Text>{t("home-screen.iqama")}</Text>
        <Text>{props.iqamaTime}</Text>
      </HStack>
    </Glassy>
  );
};

export default PrayerTimeCard;
