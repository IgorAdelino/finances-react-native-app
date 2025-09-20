import { Text, View } from "react-native";
import { Button } from "react-native";
import { router } from "expo-router";

export default function InProgress() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>In Progress</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
