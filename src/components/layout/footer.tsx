import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Button, StyleSheet, View } from "react-native";

interface ChangingStateProps {
  adding: boolean; // The state value passed down
  onChangeAddingStatus?: (newValue: boolean) => void; // The callback function to update parent state
}

export default function Footer({
  adding,
  onChangeAddingStatus,
}: ChangingStateProps) {
  return (
    <View style={styles.footer}>
      {!adding && (
        <Button title="Add" onPress={() => onChangeAddingStatus?.(true)}></Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  footer: {
    height: 60,
    backgroundColor: "#c2dbf5",
    justifyContent: "center",
    alignItems: "center",
  },
});
