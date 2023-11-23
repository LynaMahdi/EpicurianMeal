// api.js
const apiKey = '0a99dc9c27874eb2af7712643ff4d1b8';
const apiKey2='821d2d6c62504983bf8d8dd394444d37'
const apiKey3='23fb7cfb07dd46dfa99a286c28fa825c'

export const fetchRecipes = async ({ cuisine, dietaryPreferences, allergies }) => {
  const dietaryFilters = Object.keys(dietaryPreferences).filter((preference) => dietaryPreferences[preference]);
  const allergyFilters = Object.keys(allergies).filter((allergy) => allergies[allergy]);
  const cuisineFilter = cuisine !== '' ? `&cuisine=${cuisine}` : '';
  const dietFilter = dietaryFilters.length > 0 ? `&diet=${dietaryFilters.join(',')}` : '';
  const allergyFilter = allergyFilters.length > 0 ? `&intolerances=${allergyFilters.join(',')}` : '';

  let apiUrl;

  if (cuisineFilter === '' && dietFilter === '' && allergyFilter === '') {
    apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey3}&number=36`;
  } else {
    apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey3}${cuisineFilter}${dietFilter}${allergyFilter}`;
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response not ok');
    }
    const data = await response.json();
    return data.results || data.recipes || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
