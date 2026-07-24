import { LinearGradient } from "expo-linear-gradient";
import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ModalScreenProps extends ViewProps {
  children: React.ReactNode;
}

export function ModalScreen({ children, style, ...props }: ModalScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1" style={style} {...props}>
      <View style={{ flex: 1, paddingTop: insets.top }}>{children}</View>

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
