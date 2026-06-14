import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/gluestack-ui-provider";
import { I18nSync } from "../components/i18n-sync";
import TanstackSuery from "../components/tanstack-query";
import { useThmanyahFonts } from "../hooks/use-thamanyah-fonts";

export default function RootLayout() {
  const { loaded } = useThmanyahFonts();

  if (!loaded) {
    return null;
  }

  return (
    <TanstackSuery>
      <GluestackUIProvider>
        <I18nSync />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/font-size"
            options={{
              presentation: "modal", // iOS sheet, Android slide-up
              headerShown: false, // or true with a close button
            }}
          />
          <Stack.Screen
            name="(modals)/language"
            options={{
              presentation: "modal", // iOS sheet, Android slide-up
              headerShown: false, // or true with a close button
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </TanstackSuery>
  );
}
