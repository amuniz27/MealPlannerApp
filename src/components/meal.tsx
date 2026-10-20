// 1. Define the interface for your data item
interface MealItem {
  id: string,
  name: string,
  description: string,
  last_prepared: Date | undefined; // YYYY-MM-DD
  next_scheduled: Date | undefined; // YYYY-MM-DD
  recipe_url: string | null;
}

const defaultProps: MealItem = {
  id: "",
  name: "<Name>",
  description: "<Description",
  last_prepared: undefined,
  next_scheduled: undefined,
  recipe_url: "Recipe Url",
};

export { MealItem }
