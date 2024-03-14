import { loadRecipes } from "./utils/get-recipes.js";
import { getRecipeCard } from "./model/get-recipe-card.js";
import { filterRecipes } from "./utils/filter-recipes.js";
import { getSearchBarValue } from "./search-bar.Js";
import { displayDropdown, refreshDropdowns } from "./components/Dropdown-bis.js";

// Déclaration de la variable pour stocker les recettes
let searchGlobal = "";
let searchIngredients = [];
let searchUstensils = [];
let searchAppareil = [];

// Fonction pour afficher les recettes vers recipes__cards
function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes__cards");
  recipesContainer.innerHTML = "";
  
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeCard = getRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  }
  
  // aucun résultat trouvé
  const noResultText = document.querySelector(".no-result-text");
  noResultText.style.display = recipes.length === 0 ? "block" : "none";
  
  updateRecipesCount(recipes.length);
  
  refreshDropdowns(recipes, filterAfterAddTag);
}

function updateRecipesCount(count) {
  const counterElement = document.getElementById("total-recipes"); // id html
  if (counterElement) {
    counterElement.textContent = `${count} recettes`;
  }
}

function searchRecipes(recipes) {
  let results = filterRecipes({
    recipes,
    searchGlobal,
    searchIngredients,
    searchAppareil,
    searchUstensils
  });
  
  displayRecipes(results);
  
  return results;
}

const searchByValue = (recipes) => {
  getSearchBarValue((inputValue) => {
    searchGlobal = inputValue;
    
    // Filtre les recettes seulement si la saisie est valide
    if (inputValue.length >= 3 || inputValue === "") {
      let filteredRecipes = filterRecipes({
        recipes,
        searchGlobal,
        searchAppareil,
        searchIngredients,
        searchUstensils,
        
      });
      
      displayRecipes(filteredRecipes);
      refreshDropdowns(filteredRecipes, filterAfterAddTag);
    }
  });
};

const filterAfterAddTag = (recipes) => {
  return async (value, type) => {
   
    if (type === "ingredients") {
      searchIngredients.push(value);
    } else if (type === "appareils") {
      searchAppareil.push(value);
    } else if (type === "ustensiles") {
      searchUstensils.push(value);
    }
    
   
    let filteredRecipes = searchRecipes(recipes);
 
    refreshDropdowns(filteredRecipes, filterAfterAddTag);
  };
};

const filterAfterRemoveTag = (recipes) => {
  return (value, type) => {
    if (type === "ingredients") {
      searchIngredients = searchIngredients.filter(
        (ingredient) => ingredient !== value
      );
      searchRecipes(recipes);
    }
    if (type === "appareils") {
      searchAppareil = searchAppareil.filter(
        (appareils) => appareils !== value
      );
      searchRecipes(recipes);
    }
    if (type === "ustensils") {
      searchUstensils = searchUstensils.filter(
        (ustensile) => ustensile !== value
      );
      searchRecipes(recipes);
    }
  };
};

const init = async () => {
  const { recipes } = await loadRecipes();
  displayRecipes(recipes);
  searchByValue(recipes);
  displayDropdown(
    recipes,
    filterAfterAddTag(recipes),
    filterAfterRemoveTag(recipes)
  );
};

init();
