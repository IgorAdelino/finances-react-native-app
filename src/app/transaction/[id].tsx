import { View, Text, Button } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

export default function Transaction() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ID: {id}</Text>
      <Button title="Go to Index" onPress={() => router.back()} />
    </View>
  );
}
