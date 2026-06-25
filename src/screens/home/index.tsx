import SwipeableCarousel from "@/src/components/swipeable-carousel";
import { VStack } from "@/src/components/vstack";
import { AppScreen } from "../app-screen";
import CurrentDate from "./components/current-date";
import NextPrayer from "./components/next-prayer";
import PrayerTimes from "./components/prayer-times";
import { useNextPrayer } from "./hooks/user-next-prayer";

const HomeScreen = () => {
  const { showTomorrowPrayers } = useNextPrayer();

  const todaySlide = (
    <VStack className="gap-2" key="today">
      <CurrentDate prayerTimesDay="today" />
      <PrayerTimes prayerTimesDay="today" />
    </VStack>
  );

  const tomorrowSlide = (
    <VStack className="gap-2" key="tomorrow">
      <CurrentDate prayerTimesDay="tomorrow" />
      <PrayerTimes prayerTimesDay="tomorrow" />
    </VStack>
  );

  const items: React.ReactNode[] = showTomorrowPrayers
    ? [tomorrowSlide, todaySlide]
    : [todaySlide, tomorrowSlide];

  return (
    <AppScreen>
      <VStack className="flex-1 p-5 gap-2">
        <NextPrayer />
        <SwipeableCarousel items={items} />
      </VStack>
    </AppScreen>
  );
};

export default HomeScreen;
