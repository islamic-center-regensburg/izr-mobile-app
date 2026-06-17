// components/app-screen.tsx
import { Image, ScrollView, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./components/header";

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
        <View style={{ paddingTop: insets.top + 20 }} />
        {children}
        <View style={{ paddingTop: insets.bottom + 50 }} />
      </ScrollView>
      <Header height={insets.top + 20} />
    </View>
  );
}
