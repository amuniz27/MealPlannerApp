export interface Meal {
  id?: number;
  name: string;
  description: string;
  last_prepared: string | null; // YYYY-MM-DD
  next_scheduled: string | null; // YYYY-MM-DD
  recipe_url: string | null;
}