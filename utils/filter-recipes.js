export const filterRecipes = ({
  recipes,
  searchGlobal,
  searchIngredients,
  searchAppareil,
  searchUstensils,
}) => {
  return recipes.filter((recipe) => {
    const ingredientsMatch = searchIngredients.every((ingredient) =>
      recipe.ingredients.some(
        (recipeIngredient) =>
          recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
      )
    );

    if (!ingredientsMatch) {
      return false;
    }

    if (searchAppareil.length > 0) {
      const appareilMatch = searchAppareil.some((appareil) =>
        recipe.appliance.toLowerCase().includes(appareil.toLowerCase())
      );

      if (!appareilMatch) {
        return false;
      }
    }

    if (searchUstensils.length > 0) {
      const ustensilMatch = searchUstensils.some((ustensil) =>
        recipe.ustensils.some((recipeUstensil) =>
          recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())
        )
      );

      if (!ustensilMatch) {
        return false;
      }
    }

    const queryMatch =
      recipe.name.toLowerCase().includes(searchGlobal.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchGlobal.toLowerCase()) ||
      recipe.ingredients.some((recipeIngredient) =>
        recipeIngredient.ingredient
          .toLowerCase()
          .includes(searchGlobal.toLowerCase())
      );

    return queryMatch;
  });
};
