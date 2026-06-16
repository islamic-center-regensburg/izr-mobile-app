import { Grid, GridItem } from "@/src/components/grid";
import { Text } from "@/src/components/text";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { usePrayerTimes } from "../../hooks/use-prayer-times";
import { prayerNameKeys } from "./constants";
import PrayerTimeCard from "./prayer-time-card";

const PrayerTimes = () => {
  const { prayerTimes, isLoading } = usePrayerTimes();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={20} />
      </View>
    );
  }

  if (!prayerTimes) {
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
        <GridItem
          key={pnk}
          _extra={{ className: pnk === "isha" ? "col-span-2" : "col-span-1" }}
        >
          <PrayerTimeCard prayerNameKey={pnk} prayerTime={prayerTimes[pnk]} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default PrayerTimes;
