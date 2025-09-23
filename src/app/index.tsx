import { HomeHeader } from "@/components/HomeHeader";
import { View, StatusBar, Alert } from "react-native";
import { Target, TargetProps } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { Loading } from "@/components/Loading";
import { numberToCurrency } from "@/utils/numberToCurrency";

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

export default function Index() {
  const [isFetching, setIsFetching] = useState(true);
  const targetDatabase = useTargetDatabase();
  const [targets, setTargets] = useState<TargetProps[]>([]);

  async function fetchTargets(): Promise<TargetProps[]> {
    try {
      const response = await targetDatabase.listBySavedValue();
      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        percentage: item.percentage.toFixed(0) + "%",
        current: numberToCurrency(item.current),
        target: numberToCurrency(item.amount),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
    } catch (error) {
      Alert.alert("Atenção", "Não foi possível buscar as metas");
      console.log(error);
      return [];
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();

    const [targetData] = await Promise.all([targetDataPromise]);
    setTargets(targetData);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  if (isFetching) {
    return <Loading />;
  }

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
