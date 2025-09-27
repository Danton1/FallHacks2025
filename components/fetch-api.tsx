import { fetch } from 'expo/fetch';

const randomRecipeUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';
export async function fetchApi(url:string) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function fetchRandomRecipe() {
    try {
        const response = await fetch(randomRecipeUrl);
        const data = await response.json();
        return(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}