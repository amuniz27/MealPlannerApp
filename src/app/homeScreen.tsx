import NewMeal from "@/app/new-meal";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Footer from "../components/footer";
import { MealItem } from "../components/functional-components/meal";
import Header from "../components/layout/header";

function HomeScreen() {
  const [addingMeal, setAddingMeal] = useState(false);
  const [mealList, setMealList] = useState<MealItem[]>();
  const [mealToAdd, setMealToAdd] = useState(null);
  const [mealDeleted, setMealDeleted] = useState(false);
  const onMealAdded = (newMeal: MealItem | undefined) => {
    console.log("Handling closing of meal addition");
    console.log(newMeal);
    if (newMeal) {
      if (!mealList) {
        setMealList([newMeal]);
      } else {
        mealList.push(newMeal);
      }
    }
    setAddingMeal(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        console.log("loading saved meals");
        const value = await AsyncStorage.getItem("meal-planner.meals");
        console.log(value);
        if (value !== null) {
          // value previously stored
          const dataLaded: MealItem[] = JSON.parse(value);
          setMealList(dataLaded);
        } else {
          setMealList([]);
        }
      } catch (e) {
        // error reading value
        console.log("Error encountered trying to load data:");
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const updateData = async () => {
      try {
        console.log("in updateData");
        if (mealList) {
          console.log("mealList was updated, storing updated list");
          console.log(mealList);
          await AsyncStorage.setItem(
            "meal-planner.meals",
            JSON.stringify(mealList),
          );
        }
      } catch (e) {
        // error reading value
        console.log("Error encountered trying to save data:");
        console.log(e);
      }
    };

    if (mealList) {
      updateData();
    }
  }, [mealList, addingMeal, mealDeleted]);
  const renderItem: ListRenderItem<MealItem> = ({ item, index }) => {
    const backgroundColor = index % 2 === 0 ? "#ffffff" : "#f0f0f0";

    const editMeal = (item: MealItem) => {
      console.log("editing meal");
      console.log(item);
    };
    const findIndexOfItem = (mealItem: MealItem) => {
      return mealList?.findIndex((x) => x.name === mealItem.name);
    };

    const confirmThenDeleteMeal = (item: MealItem) => {
      const deleteMeal = (item: MealItem) => {
        const i: number | undefined = findIndexOfItem(item);
        if (mealList && i && i >= 0) {
          mealList.splice(i, 1);
        }
      };

      const confirmDeletion = () => {
        if (mealDeleted) {
          // reset value
          setMealDeleted(false);
        }
        Alert.alert(
          "Delete Meal",
          `Are you sure you want to delete ${item.name}?`,
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel", // Applies distinct native appearance on iOS
            },
            {
              text: "Delete",
              onPress: () => {
                console.log("Delete Confirmed");
                deleteMeal(item);
                setMealDeleted(true);
              },
              style: "destructive",
            },
          ],
        );
        const x = new Date();
      };
      confirmDeletion();
    };
    return (
      <View style={[styles.item, { backgroundColor }]}>
        <Text style={styles.mealTitle}>{item.name}</Text>
        {item.last_prepared && (
          <Text style={styles.content}>
            Date Last Prepared:{" "}
            {new Date(item.last_prepared).toLocaleDateString()}
          </Text>
        )}
        {item.next_scheduled && (
          <Text style={styles.content}>
            Scheduled For: {new Date(item.next_scheduled).toLocaleDateString()}
          </Text>
        )}
        <Text style={styles.description}>{item.description}</Text>
        {item.recipe_url && (
          <Text style={styles.content}>Recipe: {item.recipe_url}</Text>
        )}
        <Pressable style={styles.buttonBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => editMeal(item)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => confirmThenDeleteMeal(item)}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header></Header>
      {!addingMeal && (
        <FlatList
          data={mealList ? [...mealList] : []}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
        />
      )}
      {addingMeal && <NewMeal onNewMealClosed={onMealAdded}></NewMeal>}
      <Footer adding={addingMeal} onChangeAddingStatus={setAddingMeal}></Footer>
    </SafeAreaView>
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
  footerText: {
    color: "#fff",
    fontWeight: "bold",
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
    borderStyle: "solid",
    borderColor: "#a5272700",
  },
  buttonBar: {
    flexDirection: "row",
    alignItems: "center", // Centers buttons vertically in the row

    // Spacing
    paddingHorizontal: 10,
    gap: 12, // Modern way to add spacin
    backgroundColor: "#708abb",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#a0000000",
  },
  buttonText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
