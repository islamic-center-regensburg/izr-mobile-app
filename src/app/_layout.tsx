import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GluestackUIProvider } from "../components/gluestack-ui-provider";
import { I18nSync } from "../components/i18n-sync";
import TanstackSuery from "../components/tanstack-query";
import { useNotificationScheduler } from "../hooks/use-notification-scheduler";
import { useThmanyahFonts } from "../hooks/use-thamanyah-fonts";
import { setupNotifications } from "../notifications";

setupNotifications();

export default function RootLayout() {
  const { loaded } = useThmanyahFonts();

  useNotificationScheduler();

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
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
            <Stack.Screen
              name="(modals)/notifications"
              options={{
                presentation: "modal", // iOS sheet, Android slide-up
                headerShown: false, // or true with a close button
              }}
            />
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          </Stack>
        </GluestackUIProvider>
      </TanstackSuery>
    </GestureHandlerRootView>
  );
}
