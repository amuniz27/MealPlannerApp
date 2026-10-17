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

export { MealItem }
