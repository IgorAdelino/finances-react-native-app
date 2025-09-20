import { View } from "react-native";
import { PageHeader } from "@/components/PageHeader";
import { useLocalSearchParams } from "expo-router";
import { Progress } from "@/components/Progress";

const details = {
  current: "R$ 60.000,00",
  target: "R$ 120.000,00",
  percentage: 50,
};

export default function InProgress() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title="Apple Watch"
        rightButton={{
          onPress: () => {},
          icon: "edit",
        }}
      />
      <Progress data={details} />
    </View>
  );
}
