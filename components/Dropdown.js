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

export const displayDropdown = (recipes, filterAfterAddTag) => {
	
	const dropdownActions = {
		"ingredients-button": () =>
			displayList(
				getUniqueIngredients(recipes),
				"ingredients-list",
				filterAfterAddTag
			),
		"appareils-button": () =>
			displayList(
				getUniqueAppliances(recipes),
				"appareils-list",
				filterAfterAddTag
			),
		"ustensiles-button": () =>
			displayList(
				getUniqueUstensils(recipes),
				"ustensiles-list",
				filterAfterAddTag
			),
	};

	// Ajout des écouteurs d'événement pour chaque bouton
	document.querySelectorAll(".dropdown-button").forEach((button) => {
		button.addEventListener("click", function () {
			const buttonClass = this.classList[1];
			toggleDropdown(buttonClass);
			dropdownActions[buttonClass]?.();
		});
	});
	//écouteur pour le dropdown-search
	document.querySelectorAll(".dropdown-search").forEach((input) => {
		input.addEventListener("input", filterDropdownTags);
	});
};
//filtrage
function filterDropdownTags(event) {
	const searchInput = event.target;
	const filterText = searchInput.value.toLowerCase(); // Texte de filtrage
	const dropdownContent = searchInput
		.closest(".dropdown")
		.querySelector(".dropdown-content");
	//selection et iteration sur les tags
	dropdownContent.querySelectorAll(".dropdown-item").forEach((tag) => {
		if (tag.textContent.toLowerCase().includes(filterText)) {
			tag.style.display = ""; // Affiche le tag s'il correspond au texte filtré
		} else {
			tag.style.display = "none"; // Sinon, cache le tag
		}
	});
}

function getUniqueIngredients(recipes) {
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

	return Array.from(ustensils);
}

function getUniqueAppliances() {
	//pour appareils-list
	const appliances = new Set(recipes.map((recipe) => recipe.appliance));

	return Array.from(appliances);
}

function displayList(items, containerId, filterAfterAddTag) {
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

		tag.addEventListener("click", function () {
			const value = this.textContent; // Valeur du tag cliqué
			const type = containerId.split("-")[0];

			filterAfterAddTag(value, type);
			// TODO
			// mettre à jour les dropdown

			function updateDropdowns(recipes, filterAfterAddTag) {
				updateIngredientsDropdowns(recipes, filterAfterAddTag);
				updateAppliancesDropdown(recipes, filterAfterAddTag);
				updadeUstensilsDropdown(recipes, filterAfterAddTag);
			}

			//mettre à jour le dropdown ingredients appliances et ustensils
			//ingredients
			function updateIngredientsDropdowns(recipes, filterAfterAddTag) {
				const ingredients = getUniqueIngredients(recipes)
				displayDropdown(ingredients,"ingredients-list", filterAfterAddTag)
			}

			// Manque la fonction pour ajouter un tag

			const dropdownContent = displayArea
				.closest(".dropdown")
				.querySelector(".dropdown-content");
			dropdownContent.style.display = "none"; // ne plus afficher la liste
		});
	});
}
