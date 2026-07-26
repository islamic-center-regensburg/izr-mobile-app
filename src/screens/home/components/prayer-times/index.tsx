import Glassy from "@/src/components/glassy";
import { Grid, GridItem } from "@/src/components/grid";
import { Text } from "@/src/components/text";
import { useLangStore } from "@/src/store/lang";
import { PrayerTimesDay } from "@/src/store/prayer-times";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { useIqamaTimes } from "../../hooks/use-iqama-times";
import { usePrayerTimes } from "../../hooks/use-prayer-times";
import { JumahTimeCard } from "../jumah-time-card";
import { prayerNameKeys } from "./constants";
import PrayerTimeCard from "./prayer-time-card";

export interface PrayerTimesProps {
  prayerTimesDay: PrayerTimesDay;
}

const PrayerTimes = (props: PrayerTimesProps) => {
  const { prayerTimes, ...prayerTimesQuery } = usePrayerTimes(
    props.prayerTimesDay,
  );
  const { iqamaTimes, ...iqamaTimesQuery } = useIqamaTimes();

  const { t } = useTranslation();
  const { lang } = useLangStore();

  if (prayerTimesQuery.isLoading || iqamaTimesQuery.isLoading) {
    return (
      <Glassy style={{ height: "100%", justifyContent: "center" }}>
        <ActivityIndicator size={20} />
      </Glassy>
    );
  }
  if (!prayerTimes || !iqamaTimes) {
    return (
      <View>
        <Text>{t("home-screen.error-loading-prayer-times")}</Text>
      </View>
    );
  }

  const isTodayFriday = (date: string) => {
    const [day, month, year] = date.split("-").map(Number);
    const parsed = new Date(year, month - 1, day); // JS months are 0-indexed
    return parsed.getDay() === 5;
  };

  const filteredPrayerKeys = prayerNameKeys.filter((pnk) => pnk !== "jumah");

  function swapEveryPair<T>(array: T[]): T[] {
    if (lang === "ar") {
      const result = [...array];

      for (let i = 0; i < result.length - 1; i += 2) {
        [result[i], result[i + 1]] = [result[i + 1], result[i]];
      }
      return result;
    }
    return array;
  }

  return (
    <Grid className="gap-2" _extra={{ className: "grid-cols-2" }}>
      {swapEveryPair(filteredPrayerKeys).map((pnk) => (
        <GridItem
          key={pnk}
          _extra={{ className: pnk !== "isha" ? "col-span-1" : "col-span-2" }}
        >
          <PrayerTimeCard
            prayerTimesDay={props.prayerTimesDay}
            prayerNameKey={pnk}
            prayerTime={prayerTimes[pnk]}
            iqamaTime={iqamaTimes[pnk] ?? "--.--"}
          />
        </GridItem>
      ))}
      {isTodayFriday(prayerTimes?.gregorian_date) && (
        <GridItem _extra={{ className: "col-span-2" }}>
          <JumahTimeCard iqamaTimes={iqamaTimes.jumah} />
        </GridItem>
      )}
    </Grid>
  );
};

export default PrayerTimes;
