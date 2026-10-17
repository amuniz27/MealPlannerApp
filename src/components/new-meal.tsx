import { FlatList, Platform, StyleSheet, Text, View, ListRenderItem, TextInput} from "react-native";
import {defaultProps} from '../mock-data/default-props';

export default function NewMeal() {
    return(
      <View>
        <Text>Name:</Text>        
        <TextInput style={styles.title}>{defaultProps.name}</TextInput>
        {defaultProps.last_prepared && <TextInput style= {styles.content}>Date Last Prepared: {new Date(defaultProps.last_prepared).toLocaleDateString()}</TextInput>}
        {defaultProps.next_scheduled && <TextInput style= {styles.content}>Scheduled For: {new Date(defaultProps.next_scheduled).toLocaleDateString()}</TextInput>}
        <Text>Description:</Text>        
        <TextInput style={styles.description}>{defaultProps.description}</TextInput>
        <Text>Link to recipe:</Text>        
        {defaultProps.recipe_url && <TextInput style={styles.content}>Recipe: {defaultProps.recipe_url}</TextInput>}
      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "600",
    paddingLeft: 10,
  },
  description: {
    textAlign: "left",
    margin: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});
