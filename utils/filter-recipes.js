export const filterRecipes = ({
  recipes,
  searchGlobal,
  searchIngredients,
  searchAppareil,
  searchUstensils
}) => {
  return recipes.filter((recipe) => {
    let ingredientsMatch = true;

    // Vérifie si tous les ingrédients recherchés sont présents dans la recette
    if (searchIngredients.length > 0) {
      for (let ingredient of searchIngredients) {///for of!!!!!
        let ingredientFound = false;
        for (let recipeIngredient of recipe.ingredients) {
          if (recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()) {
            ingredientFound = true;
            break;
          }
        }
        if (!ingredientFound) {
          ingredientsMatch = false;
          break;
        }
      }
    }

    if (!ingredientsMatch) {
      return false;
    }

    // Vérifie si au moins un appareil recherché correspond à l'appareil de la recette
    if (searchAppareil.length > 0) {
      let appareilMatch = false;
      for (let appareil of searchAppareil) {////!!!!!
        if (recipe.appliance.toLowerCase().includes(appareil.toLowerCase())) {
          appareilMatch = true;
          break;
        }
      }
      if (!appareilMatch) {
        return false;
      }
    }

    // Vérifie si au moins un ustensile recherché est présent dans la recette
    if (searchUstensils.length > 0) {
      let ustensilMatch = false;
      for (let ustensil of searchUstensils) {///////!!!!!!!!!!!
        for (let recipeUstensil of recipe.ustensils) {
          if (recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())) {
            ustensilMatch = true;
            break;
          }
        }
        if (ustensilMatch) {
          break;
        }
      }
      if (!ustensilMatch) {
        return false;
      }
    }

    // Vérifie si la recherche globale correspond au nom, à la description, aux ingrédients ou aux ustensiles de la recette
    const queryMatch =
      recipe.name.toLowerCase().includes(searchGlobal.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchGlobal.toLowerCase()) ||
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.ingredient.toLowerCase().includes(searchGlobal.toLowerCase())
      ) ||
      recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(searchGlobal.toLowerCase())
      );

    return queryMatch;
  });
};
