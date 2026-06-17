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
      style={[styles.glassy, style]}
      {...props}
    >
      <BlurView intensity={0} className={cn("flex-1", className)}>
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
