import { View } from "react-native";
import { PageHeader } from "@/components/PageHeader";
import { useLocalSearchParams, router } from "expo-router";
import { Progress } from "@/components/Progress";
import { Transaction, TransactionProps } from "@/components/Transaction";
import { List } from "@/components/List";
import { TransactionTypes } from "@/utils/TransactionTypes";
import { Button } from "@/components/Button";

const details = {
  current: "R$ 60.000,00",
  target: "R$ 120.000,00",
  percentage: 50,
};

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
