document.addEventListener("DOMContentLoaded", function () {
	const dropdownContents = document.querySelectorAll(".dropdown-content");
	for (let i = 0; i < dropdownContents.length; i++) {
		dropdownContents[i].addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdown-item")) {
				const tagName = event.target.textContent;
				addTagToSection(tagName);
			}
		});
	}

	const dropdownButtons = document.querySelectorAll(".dropdown-button");
	for (let i = 0; i < dropdownButtons.length; i++) {
		dropdownButtons[i].addEventListener("click", function () {
			const buttonClass = this.classList[1];
			toggleDropdown(buttonClass);
			dropdownActions[buttonClass]?.();
		});
	}

	const dropdownSearches = document.querySelectorAll(".dropdown-search");
	for (let i = 0; i < dropdownSearches.length; i++) {
		dropdownSearches[i].addEventListener("input", filterDropdownTags);
	}
});

function toggleDropdown(buttonClass) {
	const dropdownButton = document.querySelector(`.${buttonClass}`);
	const dropdown = dropdownButton.closest(".dropdown");
	const searchInput = dropdown.querySelector(".dropdown-search");
	const contentDiv = dropdown.querySelector(".dropdown-content");
	const isShown = searchInput.style.display === "block";
	searchInput.style.display = isShown ? "none" : "block";
	contentDiv.style.display = isShown ? "none" : "block";
}

function filterDropdownTags(event) {
	const searchInput = event.target;
	const filterText = searchInput.value.toLowerCase();
	const dropdownContent = searchInput
		.closest(".dropdown")
		.querySelector(".dropdown-content");

	const dropdownItems = dropdownContent.querySelectorAll(".dropdown-item");
	for (let i = 0; i < dropdownItems.length; i++) {
		const tag = dropdownItems[i];
		if (tag.textContent.toLowerCase().includes(filterText)) {
			tag.style.display = "";
		} else {
			tag.style.display = "none";
		}
	}
}

export function addTag(nameTag) {
	const tagElement = document.createElement("div");
	tagElement.textContent = nameTag;
	tagElement.className = "tag";

	const editButton = document.createElement("button");
	editButton.textContent = "Edit";
	editButton.className = "edit-button";

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.className = "delete-button";

	editButton.addEventListener("click", function () {
		const tagElement = this.parentNode;
		const newTagValue = prompt(
			tagElement.textContent.trim()
		);

		if (newTagValue !== null && newTagValue !== "") {
			tagElement.textContent = newTagValue.trim();
		}
	});

	tagElement.appendChild(editButton);
	tagElement.appendChild(deleteButton);

	const tagsSection = document.querySelector(".tags");
	tagsSection.appendChild(tagElement);
}

export function refreshDropdowns(filteredRecipes, filterAfterAddTag) {
	const uniqueIngredients = getUniqueIngredients(filteredRecipes);
	const uniqueAppliances = getUniqueAppliances(filteredRecipes);
	const uniqueUstensils = getUniqueUstensils(filteredRecipes);

	displayList(uniqueIngredients, "ingredients-list", filterAfterAddTag);
	displayList(uniqueAppliances, "appareils-list", filterAfterAddTag);
	displayList(uniqueUstensils, "ustensiles-list", filterAfterAddTag);
}

function getUniqueIngredients(recipes) {
	const ingredientsSet = new Set();
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		for (let j = 0; j < recipe.ingredients.length; j++) {
			const ingredient = recipe.ingredients[j].ingredient;
			ingredientsSet.add(ingredient);
		}
	}
	return Array.from(ingredientsSet);
}

function getUniqueUstensils(recipes) {
	const ustensilsSet = new Set();
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		for (let j = 0; j < recipe.ustensils.length; j++) {
			const ustensil = recipe.ustensils[j];
			ustensilsSet.add(ustensil);
		}
	}
	return Array.from(ustensilsSet);
}

function getUniqueAppliances(recipes) {
	const appliancesSet = new Set();
	for (let i = 0; i < recipes.length; i++) {
		const recipe = recipes[i];
		appliancesSet.add(recipe.appliance);
	}
	return Array.from(appliancesSet);
}

function displayList(items, containerId, filterAfterAddTag) {
	const displayArea = document.getElementById(containerId);

	if (!displayArea) {
		console.error(`Le conteneur ${containerId} n'a pas été trouvé.`);
		return;
	}

	displayArea.innerHTML = "";
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const element = document.createElement("div");
		element.textContent = item;
		element.classList.add("dropdown-item", "tag-style");
		displayArea.appendChild(element);

		element.addEventListener("click", function () {
			const value = this.textContent;
			const type = containerId.split("-")[0];
			filterAfterAddTag(value, type);
			const dropdownContent = displayArea
				.closest(".dropdown")
				.querySelector(".dropdown-content");
			dropdownContent.style.display = "none";
		});
	}
}
