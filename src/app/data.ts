import { MealProps } from "../interfaces/meal-props.js";

export const defaultProps: MealProps = {
  id: "",
  name: "",
  description: "",
  last_prepared: null,
  next_scheduled: null,
  recipe_url: null,
};

export const DATA: MealProps[] = [
  {
    ...defaultProps,
    name: "Barbecue Shredded Pork",
    description: "with mac'n'cheese",
    last_prepared: "2025-01-01",
  },
  {
    ...defaultProps,
    name: "Chicken Alfredo with Fetuccini",
    description: "",
  },
  {
    ...defaultProps,
    name: "Chicken with Rice-A-Roni",
    description: "",
    last_prepared: "2025-01-01",
  },
  {
    ...defaultProps,
    name: "Chili",
    description: "",
  },
  {
    ...defaultProps,
    name: "Cornbread chicken pot pie",
    description: "",
  },
  {
    ...defaultProps,
    name: "Ham and potatoes",
    description: "Ham cutlets with mashed sweet/russet potatos",
  },
  {
    ...defaultProps,
    name: "Pesto chicken",
    description: "",
  },
  {
    ...defaultProps,
    name: "Pinto beans with sausage",
    description: "",
  },
  {
    ...defaultProps,
    name: "Rice w/ black beans and sausge or steak",
    description: "<tbd>",
  },
  {
    ...defaultProps,
    name: "Sesame Chicken",
    description: "Sesame chicken with brown or fried rice",
  },
  {
    ...defaultProps,
    name: "Spaghetti",
    description:
      "Pot-sized spaghetti past with italian sauce and chicken meatballs",
  },
  {
    ...defaultProps,
    name: "Sweet'n'sour chicken",
    description: "With white rice",
  },
  {
    ...defaultProps,
    name: "Tacos",
    description:
      "Pot-sized spaghetti pasta with italian sauce and chicken meatballs",
  },
  {
    ...defaultProps,
    name: "Thai chicken",
    description: "With white rice",
  },
  {
    ...defaultProps,
    name: "Tortellini",
    description: "Tortellini with tomato/afredo cream sauce",
  },
  {
    ...defaultProps,
    name: "Turkey and mashed/sweet potatos",
    description: "with corn and carrots",
  },
];
function expandMeal(item: MealProps) {}

export default function getDefaultMeals(): MealProps[] {
  return DATA;
}
