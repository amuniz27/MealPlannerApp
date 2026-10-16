// 1. Define the interface for your data item
interface MealItem {
  id: string,
  name: string,
  description: string,
  last_prepared: string | null; // YYYY-MM-DD
  next_scheduled: string | null; // YYYY-MM-DD
  recipe_url: string | null;
}

const defaultProps: MealItem = {
  id: "",
  name: "",
  description: "",
  last_prepared: null,
  next_scheduled: null,
  recipe_url: null,
};

// 2. Mock Data typed with your interface
const DATA: MealItem[] = [
  { 
    ...defaultProps,
    id: '1', 
    name: "Barbecue Shredded Pork",
    description: "with mac'n'cheese",
    last_prepared: "2025-01-01"
  },
  {
    ...defaultProps,
    id: "2",
    name: "Chicken Alfredo with Fetuccini",
    description: "",
  },
  {
    ...defaultProps,
    id: "3",
    name: "Chicken with Rice-A-Roni",
    description: "",
    last_prepared: "2025-01-01",
  },
  {
    ...defaultProps,
    id: "4",
    name: "Cornbread chicken pot pie",
    description: "",
  },
  {
    ...defaultProps,
    id: "5",
    name: "Ham and potatoes",
    description: "Ham cutlets with mashed sweet/russet potatos",
  },
  {
    ...defaultProps,
    id: "6",
    name: "Pesto chicken",
    description: "",
  },
  {
    ...defaultProps,
    id: "7",
    name: "Pinto beans with sausage",
    description: "",
  },
  {
    ...defaultProps,
    id:  "8",
    name: "Rice w/ black beans and sausge or steak",
    description: "<tbd>",
  },
  {
    ...defaultProps,
    id: "9",
    name: "Sesame Chicken",
    description: "Sesame chicken with brown or fried rice",
  },
  {
    ...defaultProps,
    id: "10",
    name: "Spaghetti",
    description:
      "Pot-sized spaghetti past with italian sauce and chicken meatballs",
  },
  {
    ...defaultProps,
    id: "11",
    name: "Sweet'n'sour chicken",
    description: "With white rice",
  },
  {
    ...defaultProps,
    id: "12",
    name: "Tacos",
    description:
      "Pot-sized spaghetti pasta with italian sauce and chicken meatballs",
  },
  {
    ...defaultProps,
    id: "13",
    name: "Thai chicken",
    description: "With white rice",
  },
  {
    ...defaultProps,
    id: "14",
    name: "Tortellini",
    description: "Tortellini with tomato/afredo cream sauce",
  },
  {
    ...defaultProps,
    id: "15",
    name: "Turkey and mashed/sweet potatos",
    description: "with corn and carrots",
  },
];

export { MealItem, DATA }
