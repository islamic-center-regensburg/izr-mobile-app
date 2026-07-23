// app/(tabs)/_layout.tsx
import { Drawer } from "expo-router/drawer";
import { Home, Settings } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { DrawerContent } from "./components/content";

export default function DrawerLayout() {
  const { t } = useTranslation();

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent", // or any other color you want for the header background
        },
        headerShadowVisible: false, // removes the default bottom border/shadow
        headerTitleAlign: "center", // Android defaults left, iOS defaults center — force both
        headerTitleStyle: {
          fontFamily: "ThmanyahSans-Regular",
          fontSize: 18,
          color: "rgba(0,0,0,1)",
        },
        headerTintColor: "rgba(0,0,0,1)", // colors the menu icon + back button, not just text
        drawerStyle: { backgroundColor: "transparent", width: "100%" },
        drawerActiveTintColor: "rgba(0,0,0,1)",
        drawerInactiveTintColor: "rgba(0,0,0,0.5)",
        drawerActiveBackgroundColor: "rgba(0,0,0,0.06)",
        drawerLabelStyle: { fontFamily: "ThmanyahSans-Regular", fontSize: 15 },
        drawerItemStyle: { borderRadius: 12, marginHorizontal: 8 },
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: t("tabbar.home"),
          drawerIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: t("tabbar.settings"),
          drawerIcon: ({ color, size }) => (
            <Settings color={color} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}
