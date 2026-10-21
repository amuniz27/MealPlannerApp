import DateInput from "@/components/functional-components/date-input";
import { MealItem } from "@/components/functional-components/meal";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface EditMealProps {
  mealItem: MealItem;
  onSaveUpdate: (originalMeal: MealItem, updatedMeal: MealItem | null) => void;
}

function EditMeal(props: EditMealProps) {
  const { id, name, description, recipe_url, last_prepared, next_scheduled } =
    props.mealItem;

  const [newName, setNewName] = useState(name);
  const [newDescription, setNewDescription] = useState(description);
  const [newLastPrepared, setNewLastPrepared] = useState<Date | undefined>(
    last_prepared,
  );
  const [newScheduledDate, setNewScheduledDate] = useState<Date | undefined>(
    next_scheduled,
  );
  const [newRecipeUrl, setNewRecipeUrl] = useState(recipe_url);
  const scheduledDateChange = (newDate: Date) => {
    setNewScheduledDate(newDate);
  };

  const lastPreparedDateChange = (newDate: Date) => {
    setNewLastPrepared(newDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="New Meal Name"
        value={name}
        onChangeText={(newText) => setNewName(newText)}
      ></TextInput>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description of meal"
        value={newDescription ?? description}
        onChangeText={(newText) => setNewDescription(newText)}
      ></TextInput>

      <Text style={styles.label}>
        Last Prepared:
        {newLastPrepared ? new Date(newLastPrepared).toLocaleDateString() : ""}
      </Text>
      <DateInput
        dateValue={last_prepared ?? new Date()}
        setDateValue={lastPreparedDateChange}
      ></DateInput>

      <Text style={styles.label}>
        Scheduled:
        {newScheduledDate == undefined
          ? " "
          : new Date(newScheduledDate).toLocaleDateString()}
      </Text>
      <DateInput
        dateValue={next_scheduled ?? new Date()}
        setDateValue={scheduledDateChange}
      />

      <Text style={styles.label}>Link to recipe:</Text>
      <TextInput
        style={styles.input}
        placeholder="Link to Recipe"
        value={recipe_url ?? ""}
        onChangeText={(newText) => setNewRecipeUrl(newText)}
      ></TextInput>

      <Pressable style={styles.buttonBar}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.onSaveUpdate(props.mealItem, {
              id: props.mealItem.id,
              name: newName,
              description: newDescription,
              recipe_url: newRecipeUrl,
              last_prepared: newLastPrepared,
              next_scheduled: newScheduledDate,
            })
          }
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => props.onSaveUpdate(props.mealItem, null)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "flex-start",
    borderWidth: 2,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    //paddingHorizontal: 12,
    fontSize: 14,
    paddingLeft: 10,
    margin: 10,
    color: "#000000",
  },
  label: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "700",
    paddingLeft: 10,
  },
  description: {
    textAlign: "left",
    margin: 10,
    fontSize: 14,
    fontWeight: "600",
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

export default EditMeal;
