import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { BlurView, BlurViewProps } from "expo-blur";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";

type GlassyProps = BlurViewProps & {
  className?: string;
};

const Glassy = ({
  className,
  style,
  intensity = 100,
  tint = "light",
  ...props
}: GlassyProps) => {
  const targetRef = useRef<View | null>(null);
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      blurTarget={targetRef}
      blurMethod="dimezisBlurViewSdk31Plus"
      style={[styles.glassy, style]}
      {...props}
    >
      <BlurView
        intensity={0}
        blurTarget={targetRef}
        blurMethod="dimezisBlurViewSdk31Plus"
        className={cn("flex-1", className)}
      >
        {props.children}
      </BlurView>
    </BlurView>
  );
};

export default Glassy;

const styles = StyleSheet.create({
  glassy: {
    overflow: "hidden",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
  },
});
