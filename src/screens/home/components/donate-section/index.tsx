import Glassy from "@/src/components/glassy";
import { Heading } from "@/src/components/heading";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import * as Clipboard from "expo-clipboard";
import { Check, CopyIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";

const DonationSection = () => {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    await Clipboard.setStringAsync(text);
    setCopiedField(field);
  };

  useEffect(() => {
    if (!copiedField) return;

    const timer = setTimeout(() => {
      setCopiedField(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [copiedField]);
  return (
    <View>
      <Heading className="mb-2 mt-4">
        {t("home-screen.donation-section.title")}
      </Heading>
      <Glassy className="p-4 rounded-lg">
        <Text>{t("home-screen.donation-section.description")}</Text>
        <VStack className="gap-2 mt-2">
          <Glassy className="bg-primary-500 p-4">
            <Text className="text-white">
              {t("home-screen.donation-section.account-holder.description")}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-sans-bold text-left">
                {t("home-screen.donation-section.account-holder.value")}
              </Text>
              <Pressable
                onPress={() =>
                  handleCopy(
                    t("home-screen.donation-section.account-holder.value"),
                    "account-holder",
                  )
                }
              >
                {copiedField === "account-holder" ? (
                  <Check size={15} color="white" />
                ) : (
                  <CopyIcon size={15} color="white" />
                )}
              </Pressable>
            </View>
          </Glassy>
          <Glassy className="bg-primary-500  p-4">
            <Text className="text-white">
              {t("home-screen.donation-section.iban.description")}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-sans-bold text-left">
                {t("home-screen.donation-section.iban.value")}
              </Text>
              <Pressable
                onPress={() =>
                  handleCopy(
                    t("home-screen.donation-section.iban.value"),
                    "iban",
                  )
                }
              >
                {copiedField === "iban" ? (
                  <Check size={15} color="white" />
                ) : (
                  <CopyIcon size={15} color="white" />
                )}
              </Pressable>
            </View>
          </Glassy>
          <Glassy className="bg-primary-500 p-4">
            <Text className="text-white">
              {t("home-screen.donation-section.bic.description")}
            </Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-white font-sans-bold text-left">
                {t("home-screen.donation-section.bic.value")}
              </Text>
              <Pressable
                onPress={() =>
                  handleCopy(t("home-screen.donation-section.bic.value"), "bic")
                }
              >
                {copiedField === "bic" ? (
                  <Check size={15} color="white" />
                ) : (
                  <CopyIcon size={15} color="white" />
                )}
              </Pressable>
            </View>
          </Glassy>
        </VStack>
      </Glassy>
    </View>
  );
};

export default DonationSection;

const styles = StyleSheet.create({});
