import { useState } from "react";
import { Alert, View } from "react-native";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { router, useLocalSearchParams } from "expo-router";
import { useTargetDatabase } from "@/database/useTargetDatabase";

export default function Target() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const params = useLocalSearchParams();
  const targetDatabase = useTargetDatabase();

  function handleSave() {
    if (!name.trim() || amount <= 0) {
      return Alert.alert("Atenção", "Preencha todos os campos");
    }

    setIsProcessing(true);

    if (params.id) {
      // update
    } else {
      create();
    }
  }

  async function create() {
    try {
      await targetDatabase.create({
        name,
        amount,
      });
      Alert.alert("Atenção", "Meta criada com sucesso", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Atenção", "Erro ao criar meta");
      console.log(error);
      setIsProcessing(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Nova meta" subTitle="Adicione uma nova meta" />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input
          label="Nome da meta"
          placeholder="Ex: Comprar um carro"
          onChangeText={setName}
        />

        <CurrencyInput
          label="Valor da meta (R$)"
          placeholder="Ex: 1000"
          value={amount}
          onChangeValue={(value) => setAmount(value || 0)}
        />

        <Button title="Salvar" onPress={handleSave} isLoading={isProcessing} />
      </View>
    </View>
  );
}
