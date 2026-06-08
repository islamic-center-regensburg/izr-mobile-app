import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { useLangStore } from "../store/lang";
import { Text } from "./text";
import { VStack } from "./vstack";

export function StorageDebug() {
  const [entries, setEntries] = useState<[string, string][]>([]);
  const { lang } = useLangStore();

  useEffect(() => {
    async function load() {
      const keys = await AsyncStorage.getAllKeys();
      const pairs = await AsyncStorage.multiGet(keys);
      setEntries(pairs as [string, string][]);
    }
    load();
  }, [lang]);

  return (
    <View className="p-3 bg-background-100 rounded-lg border border-outline-200">
      <VStack space="xs">
        {entries.map(([key, value]) => (
          <VStack key={key} space="xs">
            <Text className="text-typography-500 text-xs font-bold">{key}</Text>
            <Text className="text-xs font-mono">{value}</Text>
          </VStack>
        ))}
      </VStack>
    </View>
  );
}
