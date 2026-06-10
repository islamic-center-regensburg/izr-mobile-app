// hooks/use-tab-bar-height.ts
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_BASE_HEIGHT = Platform.OS === "ios" ? 49 : 56;

export function useTabBarHeight() {
  const insets = useSafeAreaInsets();

  return TAB_BAR_BASE_HEIGHT + insets.bottom;
}
