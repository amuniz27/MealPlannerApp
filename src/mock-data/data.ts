import { MealItem } from "../components/functional-components/meal";
import { defaultProps } from "./default-props";

let mockId = 1;
const DATA: MealItem[] = [
  {
    ...defaultProps,
    id: mockId++,
    name: "Barbecue Shredded Pork",
    description: "with mac'n'cheese",
    last_prepared: new Date("2026-08-05"),
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Chicken Alfredo with Fetuccini",
    description: "",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Chicken with Rice-A-Roni",
    description: "",
    last_prepared: new Date("2026-10-14"),
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Chili",
    description: "",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Cornbread chicken pot pie",
    description: "",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Ham and potatoes",
    description: "Ham cutlets with mashed sweet/russet potatos",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Pesto chicken",
    description: "",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Pinto beans with sausage",
    description: "",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Rice w/ black beans and sausge or steak",
    description: "<tbd>",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Sesame Chicken",
    description: "Sesame chicken with brown or fried rice",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Spaghetti",
    description:
      "Pot-sized spaghetti past with italian sauce and chicken meatballs",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Sweet'n'sour chicken",
    description: "With white rice",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Tacos",
    last_prepared: new Date("2026-07-14"),
    next_scheduled: new Date("2026-10-18"),
    description: "Ground turkey with taco seasoning on soft taco shells",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Thai chicken",
    description: "With white rice",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Tortellini",
    description: "Tortellini with tomato/afredo cream sauce",
  },
  {
    ...defaultProps,
    id: mockId++,
    name: "Turkey and mashed/sweet potatos",
    description: "with corn and carrots",
  },
];

export { DATA };
//function expandMeal(item: MealProps) {}

/*export default function getDefaultMeals(): MealProps[] {
  return DATA;
}*/
