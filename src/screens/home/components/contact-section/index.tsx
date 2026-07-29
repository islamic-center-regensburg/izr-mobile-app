import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import SwipeableCarousel from "@/src/components/swipeable-carousel";
import { Text } from "@/src/components/text";
import { Mail, Phone, User } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const ContactSection = () => {
  const { t } = useTranslation();
  const sections = [
    <View className="px-2 flex-1">
      <Glassy className="p-4 rounded-lg h-full">
        <Text>
          {t("home-screen.contact-section.description.first-chairman.name")}
        </Text>
        <View className="flex flex-row gap-2 items-center">
          <User size={"15"} className="mr-2" />
          <Text className="text-left">
            {t(
              "home-screen.contact-section.description.first-chairman.personName",
            )}
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Mail size={"15"} className="mr-2" />
          <Text className="text-left">
            {t("home-screen.contact-section.description.first-chairman.email")}
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Phone size={"15"} className="mr-2" />
          <Text className="text-left">
            {t("home-screen.contact-section.description.first-chairman.tel")}
          </Text>
        </View>
      </Glassy>
    </View>,
    <View className="px-2 flex-1">
      <Glassy className="p-4 rounded-lg h-full">
        <Text>{t("home-screen.contact-section.description.it.name")}</Text>
        <View className="flex flex-row gap-2 items-center">
          <User size={"15"} className="mr-2" />
          <Text className="text-left">
            {t("home-screen.contact-section.description.it.personName")}
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Mail size={"15"} className="mr-2" />
          <Text className="text-left">
            {t("home-screen.contact-section.description.it.email")}
          </Text>
        </View>
      </Glassy>
    </View>,
    <View className="px-2 flex-1">
      <Glassy className="p-4 rounded-lg h-full">
        <Text>
          {t("home-screen.contact-section.description.room-reservation.name")}
        </Text>
        <View className="flex flex-row gap-2 items-center">
          <User size={"15"} className="mr-2" />
          <Text className="text-left">
            {t(
              "home-screen.contact-section.description.room-reservation.personName",
            )}
          </Text>
        </View>
        <View className="flex flex-row gap-2 items-center">
          <Mail size={"15"} className="mr-2" />
          <Text className="text-left">
            {t(
              "home-screen.contact-section.description.room-reservation.email",
            )}
          </Text>
        </View>
      </Glassy>
    </View>,
  ];
  return (
    <View>
      <Heading className="mb-2 mt-4">
        {t("home-screen.contact-section.title")}
      </Heading>
      <SwipeableCarousel items={sections} />
    </View>
  );
};

export default ContactSection;

const styles = StyleSheet.create({});
