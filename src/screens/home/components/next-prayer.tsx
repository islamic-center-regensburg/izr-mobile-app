import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { useNextPrayer } from "../hooks/user-next-prayer";

const formatCountdown = (countdown: {
  hours: string;
  minutes: string;
  seconds: string;
}) => {
  return `${countdown.hours}:${countdown.minutes}:${countdown.seconds}`;
};

const NextPrayer = () => {
  const nextPrayer = useNextPrayer();
  const { t } = useTranslation();
  if (!nextPrayer) return null;
  return (
    <Glassy style={{ padding: 10 }}>
      <HStack className="justify-between items-end">
        <VStack className="w-1/2">
          <Text>{t("common.next-prayer")}</Text>
          <Heading size="5xl">
            {t(`common.prayer-names.${nextPrayer?.name}`)}
          </Heading>
        </VStack>
        <Heading size="5xl">{nextPrayer?.time}</Heading>
      </HStack>
      <HStack className="justify-between">
        <Text size="lg">{t("home-screen.remaining-time")}</Text>
        <Text size="xl">
          {nextPrayer?.countdown
            ? formatCountdown(nextPrayer.countdown)
            : "--:--:--"}
        </Text>
      </HStack>
    </Glassy>
  );
};

export default NextPrayer;

const styles = StyleSheet.create({});
