import { VStack } from "@/src/components/vstack";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { useState } from "react";
import { AppScreen } from "../common/app-screen";
import CurrentDate from "./components/current-date";
import { DayTabs } from "./components/day-tabs";
import NextPrayer from "./components/next-prayer";
import PrayerTimes from "./components/prayer-times";
import { useNextPrayer } from "./hooks/user-next-prayer";

const HomeScreen = () => {
  const { showTomorrowPrayers } = useNextPrayer();
  const [activeDay, setActiveDay] = useState<PrayerTimesDay>(
    showTomorrowPrayers ? "tomorrow" : "today",
  );

  return (
    <AppScreen>
      <VStack className="flex-1 p-5 gap-2">
        <NextPrayer />

        <DayTabs activeDay={activeDay} onChange={setActiveDay} />

        <VStack className="gap-2 p-2">
          <CurrentDate prayerTimesDay={activeDay} />
          <PrayerTimes prayerTimesDay={activeDay} />
        </VStack>
      </VStack>
    </AppScreen>
  );
};

export default HomeScreen;