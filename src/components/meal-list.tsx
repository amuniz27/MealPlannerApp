import React from "react";
import { FlatList, SafeAreaView, Text, StatusBar, StyleSheet, Task, ActivityIndicator, View, TouchableOpacity } from "react-native";
import {DATA, defaultProps} from '../app/data';
import { IMealService, MealService } from "../interfaces/meal.service";
import { MealProps } from "./meal-props.js";

interface MealListProps {
  children: MealProps[]
}

const AddIconButton = ({ onPress, icon }: IconButtonProps) => (
  <TouchableOpacity style={styles.addIcon} onPress={onPress}>
    {icon}
  </TouchableOpacity>
);

function MealList({ children }) {
  return (
      <View style={styles.container}>            
        <FlatList
          data = children            
          renderItem =  {
            (meal) => {
              return (<View>
                  <Meal></Meal>
              </View>);
            }
          }></FlatList> 
      </View>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (StatusBar.currentHeight || 0) +4,
  },
  listContainer: {
    flex: 1,
    
  },
  item: {
    backgroundColor: '##D4E6F1',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16
  },
  addIcon: {
    fontSize: 18,
    margin: 6,
    verticalAlign: "middle"
  },
  buttonBar: {
    flexDirection: "row",
    margin: 6,
    paddingVertical: 6,
    borderBottomWidth: 1,    
    borderTopWidth: 1,
  }
});

