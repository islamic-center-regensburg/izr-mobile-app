import { LinearGradient } from "expo-linear-gradient";
import { Platform, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalScreenProps extends ViewProps {
  children: React.ReactNode;
}

export function ModalScreen({ children, style, ...props }: ModalScreenProps) {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === "android";

  return (
    <View className="flex-1" style={style} {...props}>
      <View
        className="bg-white"
        style={{ flex: 1, paddingTop: isAndroid ? insets.top : 0 }}
      >
        {children}
      </View>
      <View
        className="bg-white"
        style={{ flex: 1, paddingBottom: insets.bottom + 25 }}
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
