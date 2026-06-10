// components/app-screen.tsx
import { ScrollView, View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Header } from "./components/header";

interface AppScreenProps extends ViewProps {
  children: React.ReactNode;
}

export function AppScreen({ children, style, ...props }: AppScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white" style={style} {...props}>
      <ScrollView>
        <View style={{ paddingTop: insets.top + 20 }} />
        {children}
      </ScrollView>
      <Header height={insets.top + 20} />
    </View>
  );
}
