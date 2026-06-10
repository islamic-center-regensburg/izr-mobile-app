import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

interface TabBarProps {
  height?: number;
}

export function TabBar({ height }: TabBarProps) {
  return (
    <View
      pointerEvents="none"
      style={[styles.container, height !== undefined && { height }]}
    >
      {/* Masked blur — fades in from bottom */}
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <LinearGradient
            colors={["transparent", "#000", "#000"]}
            locations={[0, 0.4, 1]}
            style={StyleSheet.absoluteFill}
          />
        }
      >
        <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
      </MaskedView>

      {/* Transparent → white tint on top */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.2)",
          "rgba(255,255,255,0.5)",
          "rgba(255,255,255,1)",
        ]}
        locations={[0, 0.2, 0.4, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
