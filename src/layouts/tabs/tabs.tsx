import { Tabs } from "expo-router";
import { Home, Settings } from "lucide-react-native";
import { Platform } from "react-native";
import { TabBar } from "./components/tab-bar";

export default function TabsLayout() {
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

        // ✅ Plug in the gradient as background
        tabBarBackground: () => <TabBar />,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
