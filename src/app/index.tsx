import { HomeHeader } from "@/components/HomeHeader";
import { View, StatusBar } from "react-native";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { router } from "expo-router";

const summary = {
  total: "R$ 1.000,00",
  input: {
    label: "Entradas",
    value: "R$ 1.000,00",
  },
  output: {
    label: "Saídas",
    value: "R$ 1.000,00",
  },
};

const targets = [
  {
    id: "1",
    name: "Comprar um carro",
    percentage: "50%",
    current: "R$ 60.000,00",
    target: "R$ 120.000,00",
  },
  {
    id: "2",
    name: "Comprar uma casa",
    percentage: "50%",
    current: "R$ 100.000,00",
    target: "R$ 200.000,00",
  },
  {
    id: "3",
    name: "Fazer uma viagem",
    percentage: "50%",
    current: "R$ 10.000,00",
    target: "R$ 20.000,00",
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <HomeHeader data={summary} />
      <List
        data={targets}
        title="Metas"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhuma meta encontrada"
        containerStyle={{ paddingHorizontal: 24 }}
      />
      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova meta" onPress={() => router.push("/target")} />
      </View>
    </View>
  );
}
