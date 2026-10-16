import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { FlatList, Platform, StyleSheet, Text, View, ListRenderItem, ScrollView } from "react-native";
import { MealItem, DATA } from "../components/meal"
import { SafeAreaFrameContext } from "react-native-safe-area-context";

// Modal States
//const [modalVisible, setModalVisible] = useState<boolean>(false);
//const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
//const [mealName, setMealName] = useState<string>("");
//const [prepTime, setPrepTime] = useState<string>("");

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

function Header() {
  return (
    <View>
      <Text style={styles.title}>Meal Planner</Text>
    </View>
  );
}

export default function HomeScreen() {

  const renderItem: ListRenderItem<MealItem> = ({ item }) => (
    <View style={{ padding: 20 }}>
      <Text>{item.name}</Text>
    </View>
  );
  
  //onst [selectedMeal, setSelectedMeal] = useState<MealProps | null>(null);

  //const renderMeal: ListRenderItem<MealProps> = ( { item } ) => {

    return (
        <ScrollView>
          <FlatList data = { DATA }
            renderItem = {renderItem}
            keyExtractor = {(item) => item.name}
            ListHeaderComponent={ Header }/>
        </ScrollView>
      )

  }

  // Form States
//  const defaultMeals = getDefaultMeals();
 // const renderItem: ListRenderItem<Meal> = ({ item }) => (
  //  <Meal prop={item, index} />
  //);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
