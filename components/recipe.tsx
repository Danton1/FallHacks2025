import { fetchRandomRecipe } from '@/components/fetch-api';

export type RecipeProps = {
    id: String;
    name: String;
    type: String;
    ingredients: Array<IngredientProps>;
    instructions: String;
    image: String;
}

type IngredientProps = {
    measurement: String,
    name: String
}

export async function generateRecipeObject() {
    try {
        const recipeResponse = await fetchRandomRecipe();
        const recipe = recipeResponse.meals[0];

        const ingredientArray = [];
        // For 20 ingredients of api
        for (let i = 1; i <= 20; i++) {
            const stringIngredient = `strIngredient${i}`
            const stringMeasurement = `strMeasure${i}`
            if (recipe[stringIngredient] != "") {
                const ingredientObject = {
                    measurement: recipe[stringMeasurement],
                    name: recipe[stringIngredient]
                }
                ingredientArray.push(ingredientObject);
            } else {
                break;
            }
        }
        
        const recipeObject = {
            id: recipe.idMeal,
            name: recipe.strMeal,
            type: recipe.strArea,
            ingredients: ingredientArray,
            instructions: recipe.strInstructions,
            image: recipe.strMealThumb
        }

        return recipeObject;
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
}

export async function generateTenRecipeObjects() {
  const promises = [];
  for (let i = 0; i < 10; i++) {
    promises.push(generateRecipeObject());
  }
  const results = await Promise.all(promises);
  // Filter out any undefined results (in case of errors)
  return results.filter((r): r is RecipeProps => !!r);
}