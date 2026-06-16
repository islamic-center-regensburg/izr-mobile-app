import { VStack } from "@/src/components/vstack";
import { AppScreen } from "../app-screen";
import NextPrayer from "./components/next-prayer";
import PrayerTimes from "./components/prayer-times";
import TodayDate from "./components/today-date";

const HomeScreen = () => {
  return (
    <AppScreen>
      <VStack className="flex-1 p-5 gap-2">
        <NextPrayer />
        <TodayDate />
        <PrayerTimes />
      </VStack>
    </AppScreen>
  );
};

export default HomeScreen;
