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
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export interface DateInputProps {
  dateValue: Date; // current date value
  setDateValue: (newValue: Date) => void; // call back to report back the date selected
}

export default function DateInput(props: DateInputProps) {
    const [dateValue, setDateValue] = useState(new Date());
   
    const showAndroidPicker = () => {
        // 2. Safe Platform Wrapper
        if (Platform.OS === 'android') {
            (DateTimePickerAndroid as any).open({
                value: dateValue,
                mode: 'date',
                is24Hour: true,
                onChange: (event: any, selectedDate: Date) => {                    
                    if (event.type === 'set' && selectedDate) {
                        setDateValue(selectedDate);
                    }
                    // The 'dismissed' type handles the cancel button natively
                },
            });
        }
    }

    return (
    <View style={{ padding: 24 }}>
      <Button title="Select Date" onPress={showAndroidPicker} />
      <Text>Selected: {dateValue.toLocaleDateString()}</Text>
    </View>);
  /*  const onDateChange = (event: any, selectedDate: Date) => {

        const { type } = event;

        console.log(`event: ${JSON.stringify(event)}`);

        // Android requires manually hiding the modal once a selection or dismissal happens
        if (Platform.OS === "android") {
            setDateTimePickerVisible(false);
        }
        if(type == 'dismissed')
        {
            setDateTimePickerVisible(false);
            console.log('User cancedlled date entry');
            return;
        }

        if (type == 'set' && selectedDate) {
            console.log('type is set');
        }
        // If the user didn't tap "Cancel", update the state
        if (event.nativeEvent) {
            console.log(
                `setting ${props.dateLabel} to ${new Date(event.nativeEvent.timestamp)}`);
            props.setDateValue(new Date(event.nativeEvent.timestamp));
            setDateTimePickerVisible(false);
        }
  };
*/
}
  /*return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.dateLabel}</Text>

      <Pressable style={styles.pressArea} onPress={() => setDateTimePickerVisible(true)}>
        <View pointerEvents="none">
          <TextInput
            style={styles.input}
            placeholder={
              props.placeholder ? props.placeholder : "Select a date"
            }
            value={props.dateValue?.toLocaleDateString()}
            editable={false} // Prevents the soft keyboard from pushing up 
          />
        </View>
      </Pressable>

      { dateTimePickerVisible && (
        <DateTimePickerAndroid
          value={props.dateValue ?? new Date()}
          mode="date"
          display={Platform.OS === "android" ? "calendar" : "default"}
          onValueChange={onDateChange}
        />
      )}
    </View>
     }
  );*/

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
  },
  pressArea: {
    borderWidth: 2,
    borderColor: "#ff0000"
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
