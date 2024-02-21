// Déclaration de la variable pour stocker les recettes
let recipes = [];

// Fonction asynchrone pour charger les recettes
async function loadRecipes() {
	try {
		const response = await fetch("data/recipes.json");
		const data = await response.json();
		recipes = data.recipes;
		displayRecipes(recipes);
		updateRecipesCount(recipes.length);
	
		
	} catch (error) {
		console.error("Erreur lors du chargement des recettes:", error);
	}
}

// Fonction pour afficher les recettes vers recipes__cards
function displayRecipes(recipesToDisplay) {
	const recipesContainer = document.getElementById("recipes__cards");
	recipesContainer.innerHTML = ""; // Efface les recettes existantes avant d'afficher les nouvelles
	// Création et ajout des cartes de recettes au container
	recipesToDisplay.forEach((recipe) => {
		const recipeCard = getRecipeCard(recipe);
		recipesContainer.appendChild(recipeCard);
	});

	// aucun résultat trouvé
	const noResultText = document.querySelector(".no-result-text");
	noResultText.style.display = recipesToDisplay.length === 0 ? "block" : "none";

	updateRecipesCount(recipesToDisplay.length);
}

function updateRecipesCount(count) {
	const counterElement = document.getElementById("total-recipes"); // id html
	if (counterElement) {
		counterElement.textContent = `${count} recettes`;
	}
}
