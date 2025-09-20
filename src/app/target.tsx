import { router } from "expo-router";
import { View } from "react-native";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader title="Nova meta" subTitle="Adicione uma nova meta" />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" placeholder="Ex: Comprar um carro" />
        <CurrencyInput
          label="Valor da meta (R$)"
          placeholder="Ex: 100000"
          value={0}
        />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
