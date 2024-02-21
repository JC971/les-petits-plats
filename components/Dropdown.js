//fonction pour masquer les drpdowns
function toggleDropdown(buttonClass) {
	const dropdown = document
		.querySelector(`.${buttonClass}`)
		.closest(".dropdown");
	// atteindre la barre de recherche et le contenu
	const searchInput = dropdown.querySelector(".dropdown-search");
	const contentDiv = dropdown.querySelector(".dropdown-content");

	// Invisible/visible
	const isShown = searchInput.style.display === "block";
	searchInput.style.display = isShown ? "none" : "block";
	contentDiv.style.display = isShown ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", () => {
	loadRecipes()
		.then(() => {
			// Initialisation des dropdowns avec les actions spécifiques pour chacun
			const dropdownActions = {
				"ingredients-button": () =>
					displayList(getUniqueIngredients(), "ingredients-list"),
				"appareils-button": () =>
					displayList(getUniqueAppliances(), "appareils-list"),
				"ustensiles-button": () =>
					displayList(getUniqueUstensils(), "ustensiles-list"),
			};
			// Ajout des écouteurs d'événement pour chaque bouton
			document.querySelectorAll(".dropdown-button").forEach((button) => {
				button.addEventListener("click", function () {
					const buttonClass = this.classList[1];
					const listId = `${buttonClass.split("-")[0]}-list`;
					toggleDropdown(buttonClass);
					dropdownActions[buttonClass]?.();
				});
			});
			//écouteur pour le dropdown-search
			document.querySelectorAll(".dropdown-search").forEach(input => {
				input.addEventListener("input", filterDropdownTags);

			})
				.catch(console.error);
		});
	
	//filtrage
	function filterDropdownTags(event) {
		const searchInput = event.target; 
    const filterText = searchInput.value.toLowerCase(); // Texte de filtrage
    const dropdownContent = searchInput.closest(".dropdown").querySelector(".dropdown-content");
    //selection et iteration sur les tags
    dropdownContent.querySelectorAll(".dropdown-item").forEach(tag => {
        if (tag.textContent.toLowerCase().includes(filterText)) {
            tag.style.display = ""; // Affiche le tag s'il correspond au texte filtré
        } else {
            tag.style.display = "none"; // Sinon, cache le tag
        }
    });
}

	function getUniqueIngredients() {
		//pour ingredients-button
		const ingredients = new Set(
			recipes
				.map((recipe) =>
					recipe.ingredients.map((ingredient) => ingredient.ingredient)
				)
				.flat()
		);

		return Array.from(ingredients);
	}

	function getUniqueUstensils() {
		//ustensiles dans un sous tableau
		const ustensils = new Set(recipes.map((recipe) => recipe.ustensils).flat());
		console.log(ustensils);

		return Array.from(ustensils);
	}

	function getUniqueAppliances() {
		//pour appareils-list
		const appliances = new Set(recipes.map((recipe) => recipe.appliance));

		return Array.from(appliances);
	}

	function displayList(items, containerId) {
		const displayArea = document.getElementById(containerId);
		if (!displayArea) {
			console.error(`Le conteneur ${containerId} n'a pas été trouvé.`);
			return;
		}

		// Efface le contenu existant de la liste
		displayArea.innerHTML = "";

		items.forEach((item) => {
			// Création d'un élément de tag dans une div
			const tag = document.createElement("div");
			tag.textContent = item; // Texte du tag
			tag.classList.add("dropdown-item", "tag-style"); 
			displayArea.appendChild(tag); // Ajout du tag

			// Gestionnaire de clic sur le tag
			tag.addEventListener("click", function () {
				const searchInput = displayArea
					.closest(".dropdown")
					.querySelector(".dropdown-search");
				searchInput.value = this.textContent;

				const type = containerId.split("-")[0];
				filterAndDisplayRecipes(searchInput.value, type);

				const dropdownContent = displayArea
					.closest(".dropdown")
					.querySelector(".dropdown-content");
				dropdownContent.style.display = "none"; // ne plus afficher la liste
			});
		});
	}

	function filterAndDisplayRecipes(query, type) {
		let filteredRecipes = recipes.filter((recipe) => {
			switch (type) {
				case "ingredients":
					return recipe.ingredients.some((ingredient) =>
						ingredient.ingredient.toLowerCase().includes(query.toLowerCase())
					);
				case "ustensiles":
					return recipe.ustensils.some((ustensil) =>
						ustensil.toLowerCase().includes(query.toLowerCase())
					);
				case "appareils":
					return recipe.appliance.toLowerCase().includes(query.toLowerCase());
				default:
					return false;
			}
		});

		displayRecipes(filteredRecipes);
	}
})
