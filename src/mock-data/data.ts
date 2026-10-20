import { MealItem } from "../components/functional-components/meal";
import { defaultProps } from "./default-props";

const DATA: MealItem[] = [
  {
    ...defaultProps,
    name: "Barbecue Shredded Pork",
    description: "with mac'n'cheese",
    last_prepared: "2026-08-05",
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
    last_prepared: "2026-10-14",
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
    last_prepared: "2026-07-14",
    next_scheduled: "2026-10-18",
    description: "Ground turkey with taco seasoning on soft taco shells",
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

export { DATA };
//function expandMeal(item: MealProps) {}

/*export default function getDefaultMeals(): MealProps[] {
  return DATA;
}*/
