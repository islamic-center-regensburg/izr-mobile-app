// app/(tabs)/_layout.tsx
import { Heading } from "@/src/components/heading";
import { Text } from "@/src/components/text";
import { VStack } from "@/src/components/vstack";
import { LinearGradient } from "expo-linear-gradient";
import {
  DrawerContentComponentProps,
  DrawerItemList,
} from "expo-router/drawer";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function DrawerContent(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <View style={StyleSheet.absoluteFill}>
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          backgroundColor: "white",
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <DrawerItemList {...props} />
        <VStack
          className="flex-1 items-center justify-end pb-4"
          style={{ paddingBottom: insets.bottom + 25 }}
        >
          <Image
            source={require("@/assets/images/icon.png")}
            resizeMode="cover"
            style={{
              bottom: 0,
              right: 0,
              width: 200,
              height: 200,
              zIndex: 9999,
            }}
          />
          <Heading>{t("common.izr")}</Heading>
          <Text size="xs">{t("common.copyright", { year })}</Text>
        </VStack>
      </View>

      <Image
        source={require("@/assets/images/kufic-bg.png")}
        resizeMode="cover"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 450,
          height: 450,
          opacity: 0.15,
        }}
      />
      <LinearGradient
        colors={["rgba(60, 60, 60, 0)", "rgba(60, 60, 60, 0.35)"]}
        locations={[0, 1]}
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: insets.bottom + 100,
        }}
      />
    </View>
  );
}
