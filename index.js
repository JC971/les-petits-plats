import { loadRecipes } from "./utils/get-recipes.js";
import { getRecipeCard } from "./model/get-recipe-card.js";
import { filterRecipes } from "./utils/filter-recipes.js";
import { getSearchBarValue } from "./search-bar.js";
import { displayDropdown } from "./components/Dropdown.js";

// Déclaration de la variable pour stocker les recettes
let searchGlobal = "";
let searchIngredients = [];
let searchUstensils = [];
let searchAppareil = [];

// Fonction pour afficher les recettes vers recipes__cards
function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes__cards");
  recipesContainer.innerHTML = ""; // Efface les recettes existantes avant d'afficher les nouvelles
  // Création et ajout des cartes de recettes au container
  recipes.forEach((recipe) => {
    const recipeCard = getRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
  
  // aucun résultat trouvé
  const noResultText = document.querySelector(".no-result-text");
  noResultText.style.display = recipes.length === 0 ? "block" : "none";
  
  updateRecipesCount(recipes.length);
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
    searchAppareil,
    searchGlobal,
    searchIngredients,
    searchUstensils,
  });
  
  displayRecipes(results);
  ////
 
  return (results);
}

const searchByValue = (recipes) => {
  getSearchBarValue((inputValue) => {
    searchGlobal = inputValue;
    
    if (inputValue === "") {
      searchRecipes(recipes);
    } else if (inputValue.length >= 3) {
      searchRecipes(recipes);
    }
  });
};
/*
const filterAfterAddTag = (recipes) => {
  return (value, type) => {
    if (type === "ingredients") {
      searchIngredients.push(value);
     
    }
    if (type === "appareils") {
      searchAppareil.push(value);
      
    }
    if (type === "ustensiles") {
      searchUstensils.push(value);
      
    }
    searchRecipes(recipes);
  };
};*/
const filterAfterAddTag = (recipes) => {
  return async (value, type) => {
    // Mise à jour des tableaux de filtres basés sur le type de tag
    if (type === "ingredients") {
      searchIngredients.push(value);
    } else if (type === "appareils") {
      searchAppareil.push(value);
    } else if (type === "ustensiles") {
      searchUstensils.push(value);
    }
    
    // Filtre les recettes basées sur les critères de recherche mis à jour
    let filteredRecipes = searchRecipes(recipes);
      refreshDropdowns(filteredRecipes);
    
    // Rafraîchir les dropdowns avec les recettes filtrées
    //refreshDropdowns(filteredRecipes);
  };
};


const filterAfterRemoveTag = (recipes) => {
  return (value, type) => {
    if (type === "ingredients") {
      //searchIngredients.filter((ingredient) => ingredient !== value);
      searchIngredients = searchIngredients.filter(ingredient => ingredient !== value);
    }
    if (type === "appareils") {
      //searchAppareil.filter((appareil) => appareil !== value);
      searchAppareil = searchAppareil.filter(appareils => appareils !==value)
    }
    if (type === "ustensils") {
      //searchUstensils.filter((ustensile) => ustensile !== value);
        searchUstensils = searchUstensils.filter((ustensile) => ustensile !== value);
    }
    searchRecipes(recipes);
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
  