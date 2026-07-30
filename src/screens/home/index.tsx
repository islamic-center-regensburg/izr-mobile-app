import { VStack } from "@/src/components/vstack";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { useEffect, useState } from "react";
import { AppScreen } from "../common/app-screen";
import AboutSection from "./components/about-section";
import ContactSection from "./components/contact-section";
import CurrentDate from "./components/current-date";
import { DayTabs } from "./components/day-tabs";
import DonationSection from "./components/donate-section";
import FollowUsSection from "./components/follow-us-section";
import NextPrayer from "./components/next-prayer";
import PrayerTimes from "./components/prayer-times";
import { useNextPrayer } from "./hooks/use-next-prayer";

const HomeScreen = () => {
  const { showTomorrowPrayers } = useNextPrayer();
  const [activeDay, setActiveDay] = useState<PrayerTimesDay>(
    showTomorrowPrayers ? "tomorrow" : "today",
  );

  useEffect(() => {
    if (showTomorrowPrayers) {
      setActiveDay("tomorrow");
    } else {
      setActiveDay("today");
    }
  }, [showTomorrowPrayers]);

  return (
    <AppScreen>
      <VStack className="flex-1 p-5 gap-2">
        <NextPrayer />
        <DayTabs activeDay={activeDay} onChange={setActiveDay} />
        <VStack className="gap-2 p-2">
          <CurrentDate prayerTimesDay={activeDay} />
          <PrayerTimes prayerTimesDay={activeDay} />
        </VStack>
        <AboutSection />
        <FollowUsSection />
        <ContactSection />
        <DonationSection />
      </VStack>
    </AppScreen>
  );
};

export default HomeScreen;
