import { StyleSheet, Text, View} from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Meal Planner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        backgroundColor: '#c2dbf5',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: "bold",
    },
    title: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    },
});
