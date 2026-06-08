import { StyleSheet, View } from "react-native";
import { Button, ButtonText } from "../components/button";
import { HStack } from "../components/hstack";
import { StorageDebug } from "../components/storage-debug";
import { useLangStore } from "../store/lang";

export default function Index() {
  const { setLang } = useLangStore();

  return (
    <View style={styles.container}>
      <HStack space="sm">
        <Button onPress={() => setLang("en")}>
          <ButtonText>English</ButtonText>
        </Button>
        <Button onPress={() => setLang("ar")}>
          <ButtonText>العربية</ButtonText>
        </Button>
        <Button onPress={() => setLang("de")}>
          <ButtonText>Deutsch</ButtonText>
        </Button>
      </HStack>

      <StorageDebug />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
