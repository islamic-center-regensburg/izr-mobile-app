import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { HStack } from "@/src/components/hstack";
import { Text } from "@/src/components/text";
import { useTranslation } from "react-i18next";
import { Image, Linking, Pressable, StyleSheet, View } from "react-native";

const FollowUsSection = () => {
  const { t } = useTranslation();
  const socialMediaLinks = [
    {
      url: "https://www.facebook.com/p/Islamisches-Zentrum-Regensburg-61557924383526",
      icon: require("@/assets/images/social-media-icons/facebook.png"),
    },
    {
      url: "https://www.instagram.com/islamischeszentrumregensburg_",
      icon: require("@/assets/images/social-media-icons/instagram.png"),
    },
    {
      url: "https://www.tiktok.com/@islamischeszentrumrgbg",
      icon: require("@/assets/images/social-media-icons/tiktok.png"),
    },
    {
      url: "https://www.iz-regensburg.de",
      icon: require("@/assets/images/social-media-icons/globe.png"),
    },
    {
      url: "https://chat.whatsapp.com/JO9nFuMixKv8PLbhYu6MZH",
      icon: require("@/assets/images/social-media-icons/whatsapp.png"),
    },
  ];
  return (
    <View>
      <Heading>{t("home-screen.follow-us-section.title")}</Heading>
      <Glassy className="p-4 rounded-lg">
        <Text>{t("home-screen.follow-us-section.description")}</Text>
        <HStack className="flex-row justify-around items-center mt-2 w-full">
          {socialMediaLinks.map((link, index) => (
            <Pressable key={index} onPress={() => Linking.openURL(link.url)}>
              <Image
                source={link.icon}
                className="w-10 h-10 m-2"
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </HStack>
      </Glassy>
    </View>
  );
};

export default FollowUsSection;

const styles = StyleSheet.create({});
