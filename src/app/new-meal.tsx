import { StyleSheet, Text, View, TextInput} from "react-native";
import {defaultProps} from '../mock-data/default-props';
import { MealItem } from "@/components/meal";
import { useState } from "react";
import DateInput from "@/components/date-input";

export default function NewMeal() {

    const newMeal: MealItem = {...defaultProps};
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [lastPrepared, setLastPrepared] = useState<Date | undefined>();
    const [scheduledDate, setScheduledDate] = useState<Date | undefined>();
    const [dateInput, setDateInput] = useState('');
    const [lastPreparedDateInput, setLastPreparedDateInput] = useState('');
    const [recipeUrl, setRecipeUrl] = useState('');
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    return(
      <View style={styles.container}>
          <Text style={styles.label}>Name:</Text>        
          <TextInput
            style={styles.input} 
            placeholder="New Meal Name"
            value = {name}
            onChangeText={(newText) => setName(newText)}>
          </TextInput>
          
          <Text style ={styles.label}>Description:</Text>        
          <TextInput            
            style={styles.input}
            placeholder="Description of meal"
            value = {description}
            onChangeText={(newText) => setDescription(newText)}>
          </TextInput>

          <Text style ={styles.label}>Last Prepared:</Text>
          <TextInput
            style= {styles.input}
            placeholder="Enter date last prepapred (mm/dd/yy)"
            value = {lastPreparedDateInput}
            onChangeText={(text) => setLastPreparedDateInput(text)}>
          </TextInput>

          <DateInput 
            showing={datePickerOpen} 
            dateLabel="Test with DatePicker" 
            onDatePickerStatusChange={setDatePickerOpen} 
            setDateValue={setLastPrepared}>            
          </DateInput>

          <Text style ={styles.label}>Schedule For:</Text>
          <TextInput
            style= {styles.input}
            placeholder="Enter next date to prepare (mm/dd/yy)"
            value = {dateInput}
            keyboardType = "numeric"
            onChangeText={(text) => setDateInput(text)}>            
          </TextInput>

          <Text style ={styles.label}>Link to recipe:</Text>        
          <TextInput
              style= {styles.input}
              placeholder="Link to Recipe"
              value = {recipeUrl}
              onChangeText={(newText) => setRecipeUrl(newText)}>
          </TextInput>
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
    borderColor: '#ccc',
    borderRadius: 8,
    //paddingHorizontal: 12,
    fontSize: 14,
    paddingLeft: 10,
    margin: 10,
    color: '#000000',
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
