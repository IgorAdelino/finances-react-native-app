import {
  TouchableOpacityProps,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
};

export function Button({ title, isLoading, ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      <Text style={styles.title}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
