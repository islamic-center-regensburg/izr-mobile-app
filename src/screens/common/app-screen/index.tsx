// components/app-screen.tsx
import { LinearGradient } from "expo-linear-gradient";
import { Image, ScrollView, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppScreenProps extends ViewProps {
  children: React.ReactNode;
}

export function AppScreen({ children, style, ...props }: AppScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1" style={style} {...props}>
      {/* Kufic pattern - top left */}
      <Image
        source={require("@/assets/images/kufic-bg.png")}
        resizeMode="cover"
        className="rotate-180"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 350,
          height: 350,
          opacity: 0.3,
        }}
      />

      {/* Kufic pattern - bottom right */}
      <Image
        source={require("@/assets/images/kufic-bg.png")}
        resizeMode="cover"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 350,
          height: 350,
          opacity: 0.15,
        }}
      />

      <ScrollView>
        {children}
        <View style={{ height: insets.bottom + 25 }} />
      </ScrollView>
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
