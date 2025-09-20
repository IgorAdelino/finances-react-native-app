import { View, TextInput, TextInputProps, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TextInputProps & {
  label: string;
  placeholder?: string;
};

export function Input({ label, placeholder, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.gray[400]}
        placeholder={placeholder}
        {...rest}
      />
    </View>
  );
}
