import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useFontSizeStore } from "../store/font-size";
import { useLangStore } from "../store/lang";
import { Button, ButtonText } from "./button";
import { Text } from "./text";
import { VStack } from "./vstack";

export function StorageDebug() {
  const [entries, setEntries] = useState<[string, string][]>([]);
  const { lang, setLang } = useLangStore();
  const { scale, setScale } = useFontSizeStore();

  useEffect(() => {
    load();
  }, [lang, scale]);

  async function load() {
    const keys = await AsyncStorage.getAllKeys();
    const pairs = await AsyncStorage.multiGet(keys);
    setEntries(pairs as [string, string][]);
  }

  async function clearAndReload() {
    await AsyncStorage.clear();
    setLang("en");
    setScale("sm");

    await load();
  }

  return (
    <View className="p-3 bg-background-100 rounded-lg border border-outline-200">
      <VStack space="xs">
        {entries.map(([key, value]) => (
          <VStack key={key} space="xs">
            <Text className="text-typography-500 text-xs font-bold text-left">
              {key}
            </Text>
            <Text className="text-xs text-left">{value}</Text>
          </VStack>
        ))}
      </VStack>
      <VStack className="gap-2 my-5">
        <Button onPress={load}>
          <ButtonText>Refresh Storage</ButtonText>
        </Button>
        <Button onPress={clearAndReload}>
          <ButtonText>Delete Storage</ButtonText>
        </Button>
      </VStack>
    </View>
  );
}
