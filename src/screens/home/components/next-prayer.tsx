import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useRTL } from "@/src/hooks/use-rtl";
import { useFontSizeStore } from "@/src/store/font-size";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { useNextPrayer } from "../hooks/user-next-prayer";

const formatCountdown = (
  countdown: {
    hours: string;
    minutes: string;
    seconds: string;
  },
  t: TFunction,
) => {
  const parts = [
    { value: countdown.hours, key: "home-screen.hours" },
    { value: countdown.minutes, key: "home-screen.min" },
    { value: countdown.seconds, key: "home-screen.sec" },
  ];

  return parts
    .filter(({ value }) => value !== "00")
    .map(({ value, key }) => `${value} ${t(key as any)}`)
    .join(" ");
};
const NextPrayer = () => {
  const { nextPrayer, isLoading } = useNextPrayer();
  const { scale } = useFontSizeStore();
  const { rtlClass } = useRTL();
  const { t } = useTranslation();
  if (isLoading || !nextPrayer) {
    return (
      <Glassy style={{ height: "30%", justifyContent: "center" }}>
        <ActivityIndicator size={20} />
      </Glassy>
    );
  }
  return (
    <Glassy style={{ padding: 10 }}>
      <Heading size="xs" className="mx-auto text-center">
        {t("common.izr")}
      </Heading>

      <View
        className={cn(
          "justify-between",
          ["lg", "md"].includes(scale) ? "flex-col" : cn(rtlClass, "items-end"),
        )}
      >
        <VStack className="flex-1">
          <Text>{t("common.next-prayer")}</Text>
          <Heading size="5xl">
            {t(`common.prayer-names.${nextPrayer?.name}`)}
          </Heading>
        </VStack>
        <Heading size="5xl">{nextPrayer?.time}</Heading>
      </View>
      <HStack
        className={cn(
          "justify-between",
          ["lg", "md"].includes(scale) ? "flex-col" : cn(rtlClass, "items-end"),
        )}
      >
        <Text size="lg">{t("home-screen.remaining-time")}</Text>
        <Text size="xl" className="font-sans-regular-no-ss01">
          {nextPrayer?.countdown
            ? formatCountdown(nextPrayer.countdown, t)
            : "--:--:--"}
        </Text>
      </HStack>
    </Glassy>
  );
};

export default NextPrayer;
