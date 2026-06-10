// store/font-size.ts - no changes needed

// hooks/useRTL.ts - strip it down
import { useTranslation } from "react-i18next";
import {
  FONT_SCALE,
  FontSizeScale,
  useFontSizeStore,
} from "../store/font-size";

export const BASE_SIZES = {
  "2xs": 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
} as const;

export type SizeKey = keyof typeof BASE_SIZES;

const LINE_HEIGHT_MULTIPLIER = {
  ltr: 1.5,
  rtl: 1.8,
} as const;

export const useRTL = () => {
  const { i18n } = useTranslation();
  const { scale: stScale } = useFontSizeStore();

  const isRTL = i18n.language === "ar";
  const lhMultiplier = isRTL
    ? LINE_HEIGHT_MULTIPLIER.rtl
    : LINE_HEIGHT_MULTIPLIER.ltr;

  const getTextStyle = (
    size: SizeKey = "md",
    scale: FontSizeScale = stScale,
  ) => {
    const fontSize = Math.round(BASE_SIZES[size] * FONT_SCALE[scale]);
    return {
      fontSize,
      lineHeight: Math.round(fontSize * lhMultiplier),
    };
  };

  return {
    isRTL,
    rtlClass: isRTL ? "flex-row-reverse" : "flex-row",
    textAlignClass: isRTL ? "text-right" : "text-left",
    directionClass: isRTL ? "direction-rtl" : "direction-ltr",
    flexDirection: isRTL ? "row-reverse" : "row",
    textAlign: isRTL ? "right" : "left",
    getTextStyle,
  };
};
