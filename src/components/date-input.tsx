import DateTimePicker, { DateTimePickerChangeEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import {
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export interface DateInputProps {
  dateLabel: string;
  showing: boolean; // The state value passed down
  onDatePickerStatusChange: (newValue: boolean) => void; // The callback function to update parent state
  setDateValue: (newValue: Date) => void; // call back to report back the date selected
}

export default function DateInput(props: DateInputProps) {
  const [dateInput, setDateInput] = useState(new Date());

  const onDateChange = (event: DateTimePickerChangeEvent, date: Date) =>
  {
    // Android requires manually hiding the modal once a selection or dismissal happens
    if (Platform.OS === "android") {
      props.onDatePickerStatusChange(false);
    }

    // If the user didn't tap "Cancel", update the state
    if (event.nativeEvent) {
      setDateInput(new Date(event.nativeEvent.timestamp));
    }
      props.onDatePickerStatusChange(false);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.dateLabel}</Text>

      {/* Wrapping the input makes the whole field tappable */}
      <Pressable onPress={() => props.onDatePickerStatusChange(true)}>
        <View pointerEvents="none">
          <TextInput
            style={styles.input}
            placeholder="Select a date"
            value={dateInput.toLocaleDateString()}
            editable={false} /* Prevents the soft keyboard from pushing up */
          />
        </View>
      </Pressable>

      {/* Conditionally render the modal trigger based on visibility state */}
      {props.showing && (
        <DateTimePicker
          value={dateInput}
          mode="date"
          display={Platform.OS === "android" ? "calendar" : "default"}
          onValueChange={onDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
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
});
