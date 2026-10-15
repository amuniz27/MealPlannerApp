import { Meal } from '@/components/meal';
import { createMMKV } from 'react-native-mmkv'

export const storage = createMMKV({ id: 'MealPlannerData'})

import { MMKV } from 'react-native-mmkv';
import { DATA } from './data';

// Your dictionary data
const meals: Meal[] = [];

// 1. Save the dictionary (Serialize to string)
storage.set('meals', JSON.stringify(meals));

// 2. Retrieve the dictionary (Deserialize back to object)
const jsonString = storage.getString('meals');


export function fetchMeals(): Meal[] {
    // 2. Retrieve the dictionary (Deserialize back to object)
    const jsonString = storage.getString('meals');   
    if (jsonString) {
        const retrievedMeals = JSON.parse(jsonString);
        console.log(retrievedMeals?.count); // Output: []]
        return retrievedMeals;
    }
    return DATA;
}

export function saveUpdatedMeal(updatedMeal: Meal) {

}

export function addMeal(updatedMeal: Meal) {

}

export function deleteMeal(id: number) {

}