import { Tabs } from "expo-router";
import { Home, Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import { TabBar } from "./components/tab-bar";

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "rgba(0,0,0,1)",
        tabBarInactiveTintColor: "rgba(0,0,0,0.5)",

        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0, // ← remove border
          elevation: 0, // ← remove android shadow
          height: Platform.OS === "ios" ? 88 : 64,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
          paddingTop: 10,
          position: "absolute", // ← allow content to flow under
        },
        tabBarLabelStyle: {
          fontFamily: "ThmanyahSans-Regular",
        },

        // ✅ Plug in the gradient as background
        tabBarBackground: () => <TabBar />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t("tabbar.home"),
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabbar.settings"),
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
