import DateInput from "@/components/date-input";
import { MealItem } from "@/components/meal";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { defaultProps } from "../mock-data/default-props";

interface NewMealProps {
//  mealAdditionConfirmed?: boolean; // false - it was cancelled, true: it was added, null - in progress
  onNewMealClosed: (meal: MealItem | undefined) => void;
}

export default function NewMeal(props: NewMealProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [lastPrepared, setLastPrepared] = useState<Date | undefined>();
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
  const [recipeUrl, setRecipeUrl] = useState("");
  const newMeal: MealItem = { 
    ...defaultProps,
    name,
    description,
    last_prepared: lastPrepared,
    next_scheduled: scheduledDate,
    recipe_url: recipeUrl
  };
  
  interface NewMealProps {
    setMealAdded?: boolean; // The state value passed down
  }

  const scheduledDateChange = (newDate: Date) => {
    console.log(`updating state for scheduledDate to ${newDate}`);
    setScheduledDate(newDate);
  };

  const lastPreparedDateChange = (newDate: Date) => {
    console.log(`updating state for LastPrepared to ${newDate}`);
    setLastPrepared(newDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="New Meal Name"
        value={name}
        onChangeText={(newText) => setName(newText)}
      ></TextInput>

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="Description of meal"
        value={description}
        onChangeText={(newText) => setDescription(newText)}
      ></TextInput>

      <Text style={styles.label}>Last Prepared: {lastPrepared?.toLocaleDateString()}</Text>
      <DateInput
        dateValue={lastPrepared ?? new Date()}
        setDateValue={lastPreparedDateChange}
      ></DateInput>

      <Text style={styles.label}>Scheduled: {scheduledDate?.toLocaleDateString()}</Text>
      <DateInput
        dateValue={scheduledDate ?? new Date()}
        setDateValue={scheduledDateChange}
      />

      <Text style={styles.label}>Link to recipe:</Text>
      <TextInput
        style={styles.input}
        placeholder="Link to Recipe"
        value={recipeUrl}
        onChangeText={(newText) => setRecipeUrl(newText)}
      ></TextInput>

      <Button title="Save" onPress={() => props.onNewMealClosed(newMeal)}></Button>
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
});
