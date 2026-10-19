import { ThemedText } from "@/components/themed-text";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { FlatList, Platform, StyleSheet, Text, View, ListRenderItem, Button} from "react-native";
import { MealItem } from "../components/meal"
import { DATA } from "../mock-data/data"
import Footer from "../components/footer"
import { SafeAreaFrameContext, SafeAreaView } from "react-native-safe-area-context";
import NewMeal from "@/app/new-meal";
import { useState } from "react";
import Header from "@/components/header";

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

export default function HomeScreen() {

  const [addingMeal, setAddingMeal] = useState(false);
  const renderItem: ListRenderItem<MealItem> = ({ item, index }) => {
    const backgroundColor = index % 2 === 0 ? '#ffffff' : '#f0f0f0';

    return(
      <View style={ [styles.item, {backgroundColor}] }>
        <Text style= {styles.mealTitle}>{item.name}</Text>
        {item.last_prepared && <Text style= {styles.content}>Date Last Prepared: {new Date(item.last_prepared).toLocaleDateString()}</Text>}
        {item.next_scheduled && <Text style= {styles.content}>Scheduled For: {new Date(item.next_scheduled).toLocaleDateString()}</Text>}
        <Text style={styles.description}>{item.description}</Text>
        {item.recipe_url && <Text style={styles.content}>Recipe: {item.recipe_url}</Text>}
      </View>
    );
  }
  return (
    <SafeAreaView style = {styles.container}>
      <Header></Header>
      {!addingMeal && <FlatList data = { DATA }
        renderItem = {renderItem}
        keyExtractor = {(item) => item.name}
      />}
      {addingMeal && <NewMeal></NewMeal>}       
      <Footer adding={addingMeal} onChangeAddingStatus={setAddingMeal}></Footer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
    backgroundColor: '#c2dbf5',
    justifyContent: 'center',
    alignItems: 'center',
 },
 footerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mealTitle: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 10,
  },
  description: {
    textAlign: "left",
    margin: 10,
    fontSize: 14,
    fontWeight: "600",
  },
  item: {
    padding: 10,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: "#a5272700"
  },
});
