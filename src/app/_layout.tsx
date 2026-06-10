import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/gluestack-ui-provider";
import { I18nSync } from "../components/i18n-sync";
import { useThmanyahFonts } from "../hooks/use-thamanyah-fonts";

export default function RootLayout() {
  const { loaded } = useThmanyahFonts();

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider>
      <I18nSync />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
}
