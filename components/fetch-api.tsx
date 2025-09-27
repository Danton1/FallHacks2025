import { fetch } from "expo/fetch";
import { RecipeProps } from "./recipe";

export type Meal = {
  idMeal: string;
  strMeal: string;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string;
  strIngredients: string[];
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  [k: string]: any;
};

const randomRecipeUrl = "https://www.themealdb.com/api/json/v1/1/random.php";
const mealByIdUrl = (id: string) =>
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

export async function fetchApi(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchRandomRecipe() {
  try {
    const response = await fetch(randomRecipeUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function mealTags(meal: RecipeProps): string[] {
  const tags: string[] = [];
  if (meal.type) tags.push(meal.type);
  if (meal.area) tags.push(meal.area);
  return tags.map((t) => t.toLowerCase());
}

export async function fetchMealById(id: string): Promise<RecipeProps> {
  const res = await fetch(mealByIdUrl(id));
  if (!res.ok) throw new Error("Failed to fetch meal");
  const data = await res.json();
  return data.meals[0] as RecipeProps;
}
