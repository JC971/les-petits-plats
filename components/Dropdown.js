function addTagToSection(tagName, type, remove) {
	const tagsSection = document.querySelector(".tags");
	const tagElement = document.createElement("div");
	tagElement.className = "tag";

	const tagText = document.createElement("span");
	tagText.textContent = tagName;
	tagElement.appendChild(tagText);

	const closeButton = document.createElement("span");
	closeButton.textContent = "×"; // Croix de fermeture
	closeButton.className = "close-button";
	closeButton.addEventListener("click", function () {
		function remove(tagName, type) {
			const tagToRemove = document.querySelector(
				`.tag[data-name="${tagName}"][data-type="${type}"]`
			);
			if (tagToRemove) {
				tagToRemove.remove();
			} else {
				console.error(
					`Le tag "${tagName}" de type "${type}" n'a pas été trouvé.`
				);
			}
		}
		remove(tagName, type);
		tagElement.remove();
	});
	tagElement.appendChild(closeButton);

	tagsSection.appendChild(tagElement);
//fermeture dropdown-search avec tag
	document.querySelectorAll(".dropdown-search").forEach((searchInput) => {
		searchInput.style.display = "none";
	});
}

export const displayDropdown = (recipes, filterAfterAddTag, remove) => {
	console.log("display dropdown");
	document.getElementById("ingredients-list").innerHTML = "";

	displayList(
		getUniqueIngredients(recipes),
		"ingredients-list",
		filterAfterAddTag,
		remove
	);
	displayList(
		getUniqueAppliances(recipes),
		"appareils-list",
		filterAfterAddTag,
		remove
	);
	displayList(
		getUniqueUstensils(recipes),
		"ustensiles-list",
		filterAfterAddTag,
		remove
	);

	document.querySelectorAll(".dropdown-search").forEach((input) => {
		input.addEventListener("input", filterDropdownTags);
	});

	document.querySelectorAll(".dropdown-button").forEach((button) => {
		button.addEventListener("click", function () {
			const buttonClass = this.classList[1];
			toggleDropdown(buttonClass);
		});
	});
};

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

	////////////////
}

function filterDropdownTags(event) {
	const searchInput = event.target;
	const filterText = searchInput.value.toLowerCase();
	const dropdownContent = searchInput
		.closest(".dropdown")
		.querySelector(".dropdown-content");

	dropdownContent.querySelectorAll(".dropdown-item").forEach((tag) => {
		if (tag.textContent.toLowerCase().includes(filterText)) {
			tag.style.display = ""; // Affiche le tag s'il correspond au texte filtré
		} else {
			tag.style.display = "none"; // Sinon, cache le tag
		}
	});
}
export function refreshDropdowns(filteredRecipes, filterAfterAddTag) {
	const uniqueIngredients = getUniqueIngredients(filteredRecipes);
	const uniqueAppliances = getUniqueAppliances(filteredRecipes);
	const uniqueUstensils = getUniqueUstensils(filteredRecipes);
	console.log({ uniqueIngredients });
	// Met à jour l'affichage de chaque dropdown
	displayList(uniqueIngredients, "ingredients-list", filterAfterAddTag);
	displayList(uniqueAppliances, "appareils-list", filterAfterAddTag);
	displayList(uniqueUstensils, "ustensiles-list", filterAfterAddTag);
}

function getUniqueIngredients(recipes) {
	//pour ingredients-button
	const ingredients = new Set(
		recipes
			.map((recipe) => recipe.ingredients.map((recipe) => recipe.ingredient))
			.flat()
	);
	return Array.from(ingredients);
}

function getUniqueUstensils(recipes) {
	//ustensiles dans un sous tableau
	const ustensils = new Set(recipes.map((recipe) => recipe.ustensils).flat());

	return Array.from(ustensils);
}

function getUniqueAppliances(recipes) {
	//pour appareils-list
	const appliances = new Set(recipes.map((recipe) => recipe.appliance));

	return Array.from(appliances);
}



function displayList(items, containerId, filterAfterAddTag, remove) {
	const displayArea = document.getElementById(containerId);

	if (!displayArea) {
		console.error(`Le conteneur ${containerId} n'a pas été trouvé.`);

		return;
	}
	console.log({ items });
	displayArea.innerHTML = "";
	console.log({ displayArea });
	items.forEach((item) => {
		// Création d'un élément de tag dans une div
		const element = document.createElement("div");
		element.textContent = item; // Texte du tag
		element.classList.add("dropdown-item", "tag-style");
		displayArea.appendChild(element); // Ajout du element

		element.addEventListener("click", function () {
			const value = this.textContent; // Valeur du element cliqué
			const type = containerId.split("-")[0];
			/////////////
			addTagToSection(value, type, remove);
			filterAfterAddTag(value, type);
			///////////////////////

			const dropdownContent = displayArea
				.closest(".dropdown")
				.querySelector(".dropdown-content");
			dropdownContent.style.display = "none"; // ne plus afficher la liste
		});
	});
}
