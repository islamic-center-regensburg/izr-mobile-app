import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

interface HeaderProps {
  height: number;
}

export function Header({ height }: HeaderProps) {
  return (
    <View pointerEvents="none" style={[styles.container, { height }]}>
      {/* Masked blur — fades out with the gradient */}
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={
          <LinearGradient
            colors={["#000", "#000", "transparent"]}
            locations={[0, 0.6, 1]}
            style={StyleSheet.absoluteFill}
          />
        }
      >
        <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
      </MaskedView>

      {/* White → transparent tint on top */}
      <LinearGradient
        colors={[
          "rgba(255,255,255,1)",
          "rgba(255,255,255,0.5)",
          "rgba(255,255,255,0.2)",
          "rgba(255,255,255,0)",
        ]}
        locations={[0, 0.2, 0.5, 1]}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
