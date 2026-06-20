// components/jumah-time-card.tsx
import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { useTranslation } from "react-i18next";

interface JumahTimeCardProps {
  iqamaTimes: string[];
}

export const JumahTimeCard = ({ iqamaTimes }: JumahTimeCardProps) => {
  const { t } = useTranslation();

  const sortedIqamaTimes = [...iqamaTimes].sort((a, b) => {
    const [aHours, aMins] = a.split(":").map(Number);
    const [bHours, bMins] = b.split(":").map(Number);
    return aHours * 60 + aMins - (bHours * 60 + bMins);
  });

  return (
    <Glassy className="w-full" style={{ padding: 10 }}>
      <Heading size="2xl">{t("common.prayer-names.jumah")}</Heading>
      {sortedIqamaTimes.map((time, index) => (
        <HStack key={index} className="justify-between">
          <Text>
            {t("home-screen.khutbah")}{" "}
            {sortedIqamaTimes.length > 1 ? index + 1 : ""}
          </Text>
          <Text>{time}</Text>
        </HStack>
      ))}
    </Glassy>
  );
};
