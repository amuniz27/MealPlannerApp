import { StyleSheet, TextInput, Text, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";


export default function DateInput(props: {dateInputLabel: string}) {
    const [dateInput, setDateInput] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    
    return (
        <View>
            <Text style={styles.label}>props.dateInputLabel</Text>
            <TextInput
                style= {styles.input}
                placeholder="Enter next date to prepare (mm/dd/yy)"
                value = {dateInput}
                keyboardType = "numeric"
                onChangeText={(text: string) => setDateInput(text)} 
            >            
            </TextInput>
        </View>
    );
} 

const styles = StyleSheet.create({
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
 });
