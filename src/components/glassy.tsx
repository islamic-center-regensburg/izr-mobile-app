import { cn } from "@gluestack-ui/utils/nativewind-utils";
import { BlurView, BlurViewProps } from "expo-blur";
import { StyleSheet } from "react-native";

type GlassyProps = BlurViewProps & {
  className?: string;
};

const Glassy = ({
  className,
  style,
  intensity = 15,
  tint = "light",
  ...props
}: GlassyProps) => {
  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      className={cn("border-3 border-neutral-400", className)}
      style={[styles.glassy, style]}
      {...props}
    />
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
