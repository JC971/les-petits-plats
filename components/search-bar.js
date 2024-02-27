
// Fonction pour filtrer les recettes en fonction du nom, des ingrédients ou de la description
//dans index
/*function searchRecipes(query) {
    query = query.toLowerCase().trim();
    const regex = new RegExp("\\b" + query + "\\b"); // en un seul mot

    // Filtre les recettes
    const filteredRecipes = recipes.filter(recipe => {
        // Vérification / nom de la recette
        const nameMatch = recipe.name.toLowerCase().match(regex);

        // Vérification / ingredients 
        const ingredientMatch = recipe.ingredients.some(ingredient =>
            ingredient.ingredient.toLowerCase().match(regex)
        );

        // Vérification / description
        const descriptionMatch = recipe.description.toLowerCase().match(regex);

        return nameMatch || ingredientMatch || descriptionMatch;
    });
  
    return filteredRecipes;
}*/

// Gestion de la barre de recherche
document.addEventListener('DOMContentLoaded', () => {


    const inputElement = document.querySelector('input[type="text"]');
    inputElement.addEventListener('input', () => {
        const query = inputElement.value.trim();
        if (query.length >= 3) {
            // Recherche et display des recettes filtrees si + 3 caracteres
            const filteredRecipes = searchRecipes(query);
            displayRecipes(filteredRecipes);
        } else {
            // sinon affiche toujours toutes les recettes
            displayRecipes(recipes);
        }
    });
});
