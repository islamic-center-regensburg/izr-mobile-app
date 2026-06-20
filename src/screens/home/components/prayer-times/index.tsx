import Glassy from "@/src/components/glassy";
import { Grid, GridItem } from "@/src/components/grid";
import { Text } from "@/src/components/text";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { useIqamaTimes } from "../../hooks/use-iqama-times";
import { usePrayerTimes } from "../../hooks/use-prayer-times";
import { JumahTimeCard } from "../jumah-time-card";
import { prayerNameKeys } from "./constants";
import PrayerTimeCard from "./prayer-time-card";

const PrayerTimes = () => {
  const { prayerTimes, ...prayerTimesQuery } = usePrayerTimes();
  const { iqamaTimes, ...iqamaTimesQuery } = useIqamaTimes();

  const { t } = useTranslation();

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

  const filteredPrayerKeys = prayerNameKeys.filter((pnk) => pnk !== "jumah");

  return (
    <Grid className="gap-2" _extra={{ className: "grid-cols-2" }}>
      {filteredPrayerKeys.map((pnk) => (
        <GridItem key={pnk} _extra={{ className: "col-span-1" }}>
          <PrayerTimeCard
            prayerNameKey={pnk}
            prayerTime={prayerTimes[pnk]}
            iqamaTime={iqamaTimes[pnk] ?? "--.--"}
          />
        </GridItem>
      ))}
      <GridItem _extra={{ className: "col-span-1" }}>
        <JumahTimeCard iqamaTimes={iqamaTimes.jumah} />
      </GridItem>
    </Grid>
  );
};

export default PrayerTimes;
