import { loadRecipes } from "./utils/get-recipes.js";
import { getRecipeCard } from "./model/get-recipe-card.js";
import { filterRecipes } from "./utils/filter-recipes.js";
import { getSearchBarValue } from "./search-bar.Js";
import { displayDropdown, refreshDropdowns } from "./components/Dropdown.js";

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
////////////////////fin display recipes

function updateRecipesCount(count) {
  const counterElement = document.getElementById("total-recipes"); // id html
  if (counterElement) {
    counterElement.textContent = `${count} recettes`;
  }
}

//////////////search recipes

function searchRecipes(recipes) {
  let results = filterRecipes({
    recipes,
    searchGlobal,
    searchIngredients,
    searchAppareil,
    searchUstensils,
  });
  
  displayRecipes(results);
  ////
  
  refreshDropdowns(results, filterAfterAddTag(recipes), filterAfterRemoveTag(recipes));
}

////////barre de recherche

const searchByValue = (recipes) => {
  getSearchBarValue((inputValue) => {
    searchGlobal = inputValue;
    
    // Filtre les recettes seulement si ...
    if (inputValue.length >= 3 || inputValue === "") {
      searchRecipes(recipes);
    }
  });
};

const filterAfterRemoveTag = (recipes) => {
  return (value, type) => {
    if (type === "ingredients") {
      searchIngredients = searchIngredients.filter(
        (ingredient) => ingredient !== value
        );
      }
      if (type === "appareils") {
        searchAppareil = searchAppareil.filter(
          (appareils) => appareils !== value
          );
        }
        if (type === "ustensiles") {
          searchUstensils = searchUstensils.filter(
            (ustensile) => ustensile !== value
            );
          }
          searchRecipes(recipes);
        };
      };
    
      const filterAfterAddTag = (recipes) => {
        return (value, type) => {
          // Mise à jour des tableaux de filtres basés sur le type de tag
          if (type === "ingredients") {
            searchIngredients.push(value);
            
          } else if (type === "appareils") {
            searchAppareil.push(value);
          } else if (type === "ustensiles") {
            searchUstensils.push(value);
          }
          searchRecipes(recipes);
        }
      }
      
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