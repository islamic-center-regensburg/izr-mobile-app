import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

const DonationSection = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Heading className="mb-2 mt-4">
        {t("home-screen.donation-section.title")}
      </Heading>
      <Glassy className="p-4 rounded-lg">
        <Text>{t("home-screen.donation-section.description")}</Text>
        <VStack className="gap-2 mt-2">
          <Glassy className="bg-primary-500/70 p-4">
            <Text className="text-white">
              {t("home-screen.donation-section.account-holder.description")}
            </Text>
            <Text className="text-white">
              {t("home-screen.donation-section.account-holder.value")}
            </Text>
          </Glassy>
          <Glassy className="bg-primary-500/70  p-4">
            <Text className="text-white">
              {t("home-screen.donation-section.iban.description")}
            </Text>
            <Text className="text-white">
              {t("home-screen.donation-section.iban.value")}
            </Text>
          </Glassy>
          <Glassy className="bg-primary-500/70 p-4">
            <Text className="text-white">
              {t("home-screen.donation-section.bic.description")}
            </Text>
            <Text className="text-white">
              {t("home-screen.donation-section.bic.value")}
            </Text>
          </Glassy>
        </VStack>
      </Glassy>
    </View>
  );
};

export default DonationSection;

const styles = StyleSheet.create({});
