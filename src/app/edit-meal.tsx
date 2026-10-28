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
import modal_styles from "./shared-styles/modal";

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
    <View style={modal_styles.container}>
      <Text style={modal_styles.label}>Name:</Text>
      <TextInput
        style={modal_styles.input}
        placeholder="New Meal Name"
        value={name}
        onChangeText={(newText) => setNewName(newText)}
      ></TextInput>

      <Text style={modal_styles.label}>Description:</Text>
      <TextInput
        style={modal_styles.input}
        placeholder="Description of meal"
        value={newDescription ?? description}
        onChangeText={(newText) => setNewDescription(newText)}
      ></TextInput>

      <Text style={modal_styles.label}>
        Last Prepared:
        {newLastPrepared ? new Date(newLastPrepared).toLocaleDateString() : ""}
      </Text>
      <DateInput
        dateValue={last_prepared ?? new Date()}
        setDateValue={lastPreparedDateChange}
      ></DateInput>

      <Text style={modal_styles.label}>
        Scheduled:
        {newScheduledDate == undefined
          ? " "
          : new Date(newScheduledDate).toLocaleDateString()}
      </Text>
      <DateInput
        dateValue={next_scheduled ?? new Date()}
        setDateValue={scheduledDateChange}
      />

      <Text style={modal_styles.label}>Link to recipe:</Text>
      <TextInput
        style={modal_styles.input}
        placeholder="Link to Recipe"
        value={recipe_url ?? ""}
        onChangeText={(newText) => setNewRecipeUrl(newText)}
      ></TextInput>

      <Pressable style={modal_styles.buttonBar}>
        <TouchableOpacity
          style={modal_styles.button}
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
          <Text style={modal_styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={modal_styles.button}
          onPress={() => props.onSaveUpdate(props.mealItem, null)}
        >
          <Text style={modal_styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

export default EditMeal;
