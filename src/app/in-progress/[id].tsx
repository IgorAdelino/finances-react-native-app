import { View, Alert } from "react-native";
import { PageHeader } from "@/components/PageHeader";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { List } from "@/components/List";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { Button } from "@/components/Button";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { numberToCurrency } from "@/utils/numberToCurrency";
import { useCallback, useState } from "react";
import { Loading } from "@/components/Loading";

const transactions: TransactionProps[] = [
  {
    id: "1",
    value: "R$ 10.000,00",
    date: "2025/01/01",
    description: "Compra de um celular",
    type: TransactionTypes.INPUT,
  },
  {
    id: "2",
    value: "R$ 20.000,00",
    date: "2025/01/02",
    description: "Compra de um notebook",
    type: TransactionTypes.OUTPUT,
  },
];

export default function InProgress() {
  const [isFetching, setIsFetching] = useState(true);
  const { id } = useLocalSearchParams();
  const targetDatabase = useTargetDatabase();
  const [details, setDetails] = useState({
    name: "",
    current: "R$ 0,00",
    target: "R$ 0,00",
    percentage: 0,
  });

  async function fetchDetails() {
    try {
      const response = await targetDatabase.show(Number(id));

      if (!response) {
        throw new Error("Meta não encontrada");
      }

      setDetails({
        name: response.name,
        current: numberToCurrency(response.current),
        target: numberToCurrency(response.amount),
        percentage: response.percentage,
      });
    } catch (error) {
      Alert.alert("Atenção", "Não foi possível buscar os detalhes da meta");
      console.log(error);
    }
  }

  async function fetchData() {
    const fetchDetailsPromise = fetchDetails();

    await Promise.all([fetchDetailsPromise]);
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
    <View style={{ flex: 1, padding: 24, gap: 32 }}>
      <PageHeader
        title={details.name}
        rightButton={{
          onPress: () => {},
          icon: "edit",
        }}
      />

      <Progress data={details} />

      <List
        data={transactions}
        title="Transações"
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
        emptyMessage="Nenhuma transação encontrada"
      />
      <Button
        title="Nova transação"
        onPress={() => {
          router.navigate(`/transaction/${id}`);
        }}
      />
    </View>
  );
}
