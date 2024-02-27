// Fonction asynchrone pour charger les recettes
export async function loadRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors du chargement des recettes:", error);
  }
}
