import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/gluestack-ui-provider";
import { useThmanyahFonts } from "../hooks/use-thamanyah-fonts";

export default function RootLayout() {
  const { loaded } = useThmanyahFonts();

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
}
