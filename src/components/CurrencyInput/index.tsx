import { View, TextInput, Text } from "react-native";
import Input, { CurrencyInputProps } from "react-native-currency-input";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = CurrencyInputProps & {
  label: string;
  placeholder?: string;
};

export function CurrencyInput({ label, placeholder, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Input
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        prefix="R$ "
        delimiter="."
        separator=","
        {...rest}
      />
    </View>
  );
}
