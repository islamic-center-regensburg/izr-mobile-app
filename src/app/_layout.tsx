import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <Stack />
    </GluestackUIProvider>
  );
}
