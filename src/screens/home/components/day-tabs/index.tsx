import { Button, ButtonText } from "@/src/components/button";
import { HStack } from "@/src/components/hstack";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { useTranslation } from "react-i18next";

export const DayTabs = ({
  activeDay,
  onChange,
}: {
  activeDay: PrayerTimesDay;
  onChange: (day: PrayerTimesDay) => void;
}) => {
  const { t } = useTranslation();

  return (
    <HStack
      space="sm"
      className="bg-background-200 rounded-full p-1 px-auto w-auto mx-auto"
    >
      {(["today", "tomorrow"] as const).map((day) => (
        <Button
          key={day}
          onPress={() => onChange(day)}
          className={cn(
            "rounded-full",
            activeDay === day ? "bg-white" : "bg-transparent",
          )}
        >
          <ButtonText
            size="xs"
            className={cn(
              "font-sans-medium",
              activeDay === day ? "text-typography-900" : "text-typography-500",
            )}
          >
            {t(`home-screen.${day}`)}
          </ButtonText>
        </Button>
      ))}
    </HStack>
  );
};
