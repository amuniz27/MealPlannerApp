import { Meal } from "@/components/meal";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import * as Device from "expo-device";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Linking,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DATA } from "./data";
import { fetchMeals, addMeal, saveUpdatedMeal, deleteMeal } from "./storage";
// Modal States
const [modalVisible, setModalVisible] = useState<boolean>(false);
const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
const [mealName, setMealName] = useState<string>("");
const [prepTime, setPrepTime] = useState<string>("");

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
  // Form States
  const [editingMealId, setEditingMealId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lastPrepared, setLastPrepared] = useState("");
  const [nextScheduled, setNextScheduled] = useState("");
  const [recipeUrl, setRecipeUrl] = useState("");
  const [meals, setMeals] = useState<Meal[]>(DATA);

  useEffect(() => {
    fetchMeals();
  }, []);

  const openModal = (meal?: Meal) => {
    if (meal) {
      setEditingMealId(meal.id || null);
      setName(meal.name);
      setDescription(meal.description || "");
      setLastPrepared(meal.last_prepared || "");
      setNextScheduled(meal.next_scheduled || "");
      setRecipeUrl(meal.recipe_url || "");
    } else {
      setEditingMealId(null);
      setName("");
      setDescription("");
      setLastPrepared("");
      setNextScheduled("");
      setRecipeUrl("");
    }
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name.trim()) return Alert.alert("Validation", "Meal name is required");
    if (name.length > 100)
      return Alert.alert("Validation", "Name must be under 100 characters");

    const mealData: Meal = {
      name,
      description,
      last_prepared: lastPrepared.trim() || null,
      next_scheduled: nextScheduled.trim() || null,
      recipe_url: recipeUrl.trim() || null,
    };

    try {
      if (editingMealId) {
        await saveUpdatedMeal(mealData);
      } else {
        await addMeal(mealData);
      }
      setModalVisible(false);
      //fetchMeals();
    } catch (error) {
      Alert.alert("Error", "Failed to save meal data.");
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this meal?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              deleteMeal(id);
              // fetchMeals();
            } catch (error) {
              Alert.alert("Error", "Failed to delete meal");
            }
          },
        },
      ],
    );
  };

  const handleToggleSchedule = async (meal: Meal) => {
    const today = new Date().toISOString().split("T")[0];
    const isScheduled = !!meal.next_scheduled;

    const updatedMeal: Meal = {
      ...meal,
      next_scheduled: isScheduled ? null : today, // Unschedule, or schedule for today quickly
    };

    try {
      /* todo: call method to update meal */
      //await axios.put(`${API_URL}/${meal.id}`, updatedMeal);
      //fetchMeals();
    } catch (error) {
      Alert.alert("Error", "Failed to update schedule status");
    }
  };

  const handleOpenLink = (url: string | null) => {
    if (url) {
      Linking.openURL(url).catch(() =>
        Alert.alert("Error", "Invalid link format"),
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles2.header}>
          <Text style={styles2.title}>🍳 Meal Planner</Text>
          <TouchableOpacity
            style={styles2.addButton}
            onPress={() => openModal()}
          >
            <Text style={styles2.addButtonText}>+ New Meal</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={meals}
          keyExtractor={(item) => item.id!.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles2.card,
                item.next_scheduled
                  ? styles2.scheduledCard
                  : styles2.unscheduledCard,
              ]}
            >
              <View style={styles2.cardHeader}>
                <Text style={styles2.mealName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles2.statusBadge}>
                  {item.next_scheduled ? "🗓️ Scheduled" : "⏳ Dormant"}
                </Text>
              </View>

              {item.description ? (
                <Text style={styles.description}>{item.description}</Text>
              ) : null}

              <View style={styles2.metaContainer}>
                <Text style={styles2.metaText}>
                  Last Made: {item.last_prepared || "Never"}
                </Text>
                {item.next_scheduled && (
                  <Text style={styles2.metaText}>
                    Next Up: {item.next_scheduled}
                  </Text>
                )}
              </View>

              {item.recipe_url && (
                <TouchableOpacity
                  onPress={() => handleOpenLink(item.recipe_url)}
                >
                  <Text style={styles2.linkText}>🔗 View Recipe</Text>
                </TouchableOpacity>
              )}

              <View style={styles2.actionRow}>
                <TouchableOpacity
                  style={styles2.actionButton}
                  onPress={() => handleToggleSchedule(item)}
                >
                  <Text style={styles2.actionButtonText}>
                    {item.next_scheduled ? "Unschedule" : "Schedule"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles2.actionButton, styles2.editBtn]}
                  onPress={() => openModal(item)}
                >
                  <Text style={styles2.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles2.actionButton, styles2.deleteBtn]}
                  onPress={() => handleDelete(item.id!)}
                >
                  <Text style={styles2.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Create / Edit Modal */}
        <Modal visible={modalVisible} animationType="slide">
          <SafeAreaView style={styles2.modalContainer}>
            <Text style={styles2.modalTitle}>
              {editingMealId ? "Edit Meal" : "Add New Meal"}
            </Text>

            <TextInput
              placeholder="Meal Name (max 100 chars)"
              maxLength={100}
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Description"
              style={styles2.input}
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <TextInput
              placeholder="Last Prepared (YYYY-MM-DD)"
              style={styles2.input}
              value={lastPrepared}
              onChangeText={setLastPrepared}
            />
            <TextInput
              placeholder="Next Scheduled (YYYY-MM-DD) [Optional]"
              style={styles2.input}
              value={nextScheduled}
              onChangeText={setNextScheduled}
            />
            <TextInput
              placeholder="Recipe Link URL"
              style={styles2.input}
              value={recipeUrl}
              onChangeText={setRecipeUrl}
              keyboardType="url"
              autoCapitalize="none"
            />

            <View style={styles2.modalActionRow}>
              <TouchableOpacity
                style={[styles2.modalButton, styles2.saveBtn]}
                onPress={handleSave}
              >
                <Text style={styles2.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles2.modalButton, styles2.cancelBtn]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles2.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </ThemedView>
  );
}

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
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  code: {
    textTransform: "uppercase",
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    backgroundColor: "##D4E6F1",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  description: {
    fontSize: 16,
  },
  addIcon: {
    fontSize: 18,
    margin: 6,
    verticalAlign: "middle",
  },
  buttonBar: {
    flexDirection: "row",
    margin: 6,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
});

const styles2 = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: { fontSize: 24, fontWeight: "bold" },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  scheduledCard: { backgroundColor: "#e3f2fd", borderColor: "#90caf9" },
  unscheduledCard: { backgroundColor: "#ffffff", borderColor: "#e0e0e0" },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  mealName: { fontSize: 18, fontWeight: "bold", width: "65%" },
  statusBadge: { fontSize: 12, fontWeight: "600", color: "#666" },
  description: { color: "#555", marginBottom: 8 },
  metaContainer: { marginVertical: 4 },
  metaText: { fontSize: 12, color: "#666" },
  linkText: { color: "#007AFF", marginVertical: 6, fontWeight: "600" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  actionButton: { padding: 8, flex: 1, alignItems: "center" },
  actionButtonText: { color: "#007AFF", fontWeight: "600" },
  editBtn: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: "#eee" },
  deleteBtn: {},
  modalContainer: { flex: 1, padding: 20, justifyContent: "center" },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  saveBtn: { backgroundColor: "#34c759" },
  cancelBtn: { backgroundColor: "#ff3b30" },
  modalButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
