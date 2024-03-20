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
     

      for (let i = 0; i < searchIngredients.length; i++) {
        let ingredientFound = false;
       
        for (let j = 0; j < recipe.ingredients.length; j++) {
          if (recipe.ingredients[j].ingredient.toLowerCase() === searchIngredients[i].toLowerCase()) {
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
      for (let i = 0; i < searchAppareil.length; i++) {
        if (recipe.appliance.toLowerCase().includes(searchAppareil[i].toLowerCase())) {
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
      for (let i = 0; i < searchUstensils.length; i++) {///////!!!!!!!!!!!
        for (let j = 0; j < recipe.ustensils.length; j++) {
          if (recipe.ustensils[j].toLowerCase().includes(searchUstensils[i].toLowerCase())) {
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
