// components/FontSizeSwitcher.tsx
import { Pressable } from "react-native";
import { HStack } from "../../../components/hstack";
import { Text } from "../../../components/text";
import { useRTL } from "../../../hooks/use-rtl";
import { FontSizeScale, useFontSizeStore } from "../../../store/font-size";

const FONT_SIZES: {
  label: string;
  labelAr: string;
  value: FontSizeScale;
  textClass: string;
}[] = [
  { label: "Aa", labelAr: "خط", value: "sm", textClass: "text-sm" },
  { label: "Aa", labelAr: "خط", value: "md", textClass: "text-base" },
  { label: "Aa", labelAr: "خط", value: "lg", textClass: "text-xl" },
] as const;

export const FontSizeSwitcher = () => {
  const { scale, setScale } = useFontSizeStore();
  const { getTextStyle, isRTL } = useRTL();

  return (
    <HStack className="items-center gap-2 p-2 w-full">
      {FONT_SIZES.map((item) => {
        const isActive = scale === item.value;

        return (
          <Pressable
            key={item.value}
            onPress={() => setScale(item.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Font size ${item.value}`}
            className={[
              "items-center justify-center",
              "rounded-lg px-3 py-2",
              "border",
              isActive
                ? "bg-primary-500 border-primary-500"
                : "bg-background-0 border-outline-200",
            ].join(" ")}
          >
            <Text
              className={[
                "font-serif-regular",
                "font-medium",
                isActive ? "text-typography-0" : "text-typography-600",
              ].join(" ")}
              style={getTextStyle("md", item.value)}
            >
              {isRTL ? item.labelAr : item.label}
            </Text>
          </Pressable>
        );
      })}
    </HStack>
  );
};
