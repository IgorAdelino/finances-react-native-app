import { router } from "expo-router";
import { View } from "react-native";
import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Target() {
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <PageHeader
        title="Nova meta"
        subTitle="Adicione uma nova meta"
        rightButton={{
          onPress: () => router.push("/"),
          icon: "home",
        }}
      />
      <View style={{ marginTop: 32, gap: 24 }}>
        <Input label="Nome da meta" placeholder="Ex: Comprar um carro" />
        <Button title="Salvar" />
      </View>
    </View>
  );
}
