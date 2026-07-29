import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading/index";
import SwipeableCarousel from "@/src/components/swipeable-carousel";
import { Text } from "@/src/components/text";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
const AboutSection = () => {
  const { t } = useTranslation();
  const descriptionItems = [
    <View className="px-2 flex-1">
      <Glassy className="p-4 rounded-lg h-full">
        <Text>{t("home-screen.about-section.description.section1")}</Text>
        <Image
          source={require("@/assets/images/izr.png")}
          className="p-2 w-full h-48 rounded-lg"
          resizeMode="cover"
        />
      </Glassy>
    </View>,
    <View className="px-2 flex-1">
      <Glassy className="p-4 rounded-lg h-full">
        <Text>{t("home-screen.about-section.description.section2")}</Text>
      </Glassy>
    </View>,
    <View className="px-2 flex-1">
      <Glassy className="p-4 rounded-lg h-full">
        <Text>{t("home-screen.about-section.description.section3")}</Text>
      </Glassy>
    </View>,
  ];
  return (
    <View>
      <Heading className="mb-2 mt-4">
        {t("home-screen.about-section.title")}
      </Heading>
      <SwipeableCarousel items={descriptionItems} />
    </View>
  );
};

export default AboutSection;

const styles = StyleSheet.create({});
