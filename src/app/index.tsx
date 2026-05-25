import { StyleSheet, Text, View } from "react-native";
import { Button, ButtonText } from "../components/button";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Islamic Center Regensburg</Text>
      <Button>
        <ButtonText>Hello</ButtonText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
