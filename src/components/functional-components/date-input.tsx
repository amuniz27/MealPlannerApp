import { useState } from "react";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

export interface DateInputProps {
  dateValue: Date; // current date value
  setDateValue: (newValue: Date) => void; // call back to report back the date selected
}

export default function DateInput(props: DateInputProps) {
  const [dateValue, setDateValue] = useState(new Date());

  const showAndroidPicker = () => {
    // 2. Safe Platform Wrapper
    if (Platform.OS === "android") {
      (DateTimePickerAndroid as any).open({
        value: dateValue,
        mode: "date",
        is24Hour: true,
        onChange: (event: any, selectedDate: Date) => {
          if (event.type === "set" && selectedDate) {
            setDateValue(selectedDate);
            props.setDateValue(selectedDate);
          }
          // The 'dismissed' type handles the cancel button natively
        },
      });
    }
  };

  return (
    <View style={{ padding: 24 }}>
      <Button title="Select Date" onPress={showAndroidPicker} />
      {/*<Text>Selected: {dateValue.toLocaleDateString()}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  pressArea: {
    borderWidth: 2,
    borderColor: "#ff0000",
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
