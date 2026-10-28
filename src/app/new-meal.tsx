import DateInput from "@/components/functional-components/date-input";
import { MealItem } from "@/components/functional-components/meal";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { defaultProps } from "../mock-data/default-props";
import modal_styles from "./shared-styles/modal";

interface NewMealProps {
  //  mealAdditionConfirmed?: boolean; // false - it was cancelled, true: it was added, null - in progress
  onNewMealClosed: (meal: MealItem | undefined) => void;
  onNewMealCancelled: () => void;
}

export default function NewMeal(props: NewMealProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lastPrepared, setLastPrepared] = useState<Date | undefined>();
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [recipeUrl, setRecipeUrl] = useState("");
  const [nameError, setNameError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const newMeal: MealItem = {
    ...defaultProps,
    name,
    description,
    last_prepared: lastPrepared,
    next_scheduled: scheduledDate,
    recipe_url: recipeUrl,
  };

  const scheduledDateChange = (newDate: Date) => {
    setScheduledDate(newDate);
  };

  const lastPreparedDateChange = (newDate: Date) => {
    setLastPrepared(newDate);
  };

  const validateName = (text: string) => {
    setName(text);
    if (!text) {
      console.log("setting name error");
      setNameError("Name is required");
      setFormValid(false);
    }
  };

  const handleSave = () => {
    validateName(name);
    console.log(`name: ${name}, validateError: ${nameError}`);
    console.log(`!name: ${!name}`);

    setFormValid(!nameError);

    if (formValid) props.onNewMealClosed(newMeal);
    else alert("Invalid name, cannot add meal");
  };

  const handleCancel = () => {
    props.onNewMealCancelled();
  };

  return (
    <View style={modal_styles.container}>
      <Text style={modal_styles.label}>Name:</Text>
      <TextInput
        style={[modal_styles.input, nameError ? modal_styles.inputError : null]}
        placeholder="New Meal Name"
        value={name}
        onChangeText={(newText) => validateName(newText)}
      ></TextInput>

      <Text style={modal_styles.label}>Description:</Text>
      <TextInput
        style={modal_styles.input}
        placeholder="Description of meal"
        value={description}
        onChangeText={(newText) => setDescription(newText)}
      ></TextInput>

      <Text style={modal_styles.label}>
        Last Prepared: {lastPrepared?.toLocaleDateString()}
      </Text>
      <DateInput
        dateValue={lastPrepared ?? new Date()}
        setDateValue={lastPreparedDateChange}
      ></DateInput>

      <Text style={modal_styles.label}>
        Scheduled: {scheduledDate?.toLocaleDateString()}
      </Text>
      <DateInput
        dateValue={scheduledDate ?? new Date()}
        setDateValue={scheduledDateChange}
      />

      <Text style={modal_styles.label}>Link to recipe:</Text>
      <TextInput
        style={modal_styles.input}
        placeholder="Link to Recipe"
        value={recipeUrl}
        onChangeText={(newText) => setRecipeUrl(newText)}
      ></TextInput>

      <Pressable style={modal_styles.buttonBar}>
        <TouchableOpacity style={modal_styles.button} onPress={handleCancel}>
          <Text style={modal_styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={modal_styles.buttont} onPress={handleCancel}>
          <Text style={modal_styles.buttonText} onPress={handleSave}>
            Save
          </Text>
        </TouchableOpacity>
      </Pressable>
    </View>
  );
}

/*const modal_styles = StyleSheet.create({
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
  inputError: {
    borderColor: "#ff4d4d",
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
    borderTopColor: "#708abb",
    borderTopWidth: 2,
  },
});
*/
