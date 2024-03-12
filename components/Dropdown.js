document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".dropdown-content").forEach((content) => {
		content.addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdown-item")) {
				const tagName = event.target.textContent;

				addTagToSection(tagName);
			}
		});
	});
});

function addTagToSection(tagName) {
    console.log("addTagToSection called with tagName:", tagName);
    const tagsSection = document.querySelector(".tags");
    const tagElement = document.createElement("div");
    tagElement.className = "tag";
    
    const tagText = document.createElement("span");
    tagText.textContent = tagName;
    tagElement.appendChild(tagText);

    const closeButton = document.createElement("span");
    closeButton.textContent = "×"; // Croix de fermeture
    closeButton.className = "close-button";
    closeButton.addEventListener("click", function() {
        tagElement.remove(); 
    });
    tagElement.appendChild(closeButton);

    tagsSection.appendChild(tagElement);
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

	document.querySelectorAll(".dropdown-search").forEach((input) => {
		input.addEventListener("input", filterDropdownTags);
	});

	document.querySelectorAll(".dropdown-button").forEach((button) => {
		button.addEventListener("click", function () {
			const buttonClass = this.classList[1];
			toggleDropdown(buttonClass);
			dropdownActions[buttonClass]?.();
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

	// Ajout des écouteurs d'événements aux boutons
	editButton.addEventListener("click", function () {
		
		const tagElement = this.parentNode; 
		
		
		const newTagValue = prompt(
			"Entrez la nouvelle valeur pour le tag:",
			tagElement.textContent.trim()
		
		);

	
		if (newTagValue !== null && newTagValue !== "") {
			// Mettre à jour le contenu du tag avec la nouvelle valeur
			tagElement.textContent = newTagValue.trim();

			// Réagir en conséquence, par exemple, mettre à jour les données associées au tag
			console.log(
				"Le tag a été édité avec succès. Nouvelle valeur:",
				newTagValue
			);
		} else {
			// Gérer le cas où l'utilisateur a annulé l'édition ou n'a pas fourni de nouvelle valeur
			console.log(
				"L'édition du tag a été annulée ou aucune nouvelle valeur n'a été fournie."
			);
		}
	});

	// Ajout des boutons à l'élément de tag
	tagElement.appendChild(editButton);
	tagElement.appendChild(deleteButton);

	// Sélection de la section où ajouter le tag
	const tagsSection = document.querySelector(".tags");

	// Ajout de l'élément de tag à la section
	tagsSection.appendChild(tagElement);
}


export function refreshDropdowns(filteredRecipes, filterAfterAddTag) {
	const uniqueIngredients = getUniqueIngredients(filteredRecipes);
	const uniqueAppliances = getUniqueAppliances(filteredRecipes);
	const uniqueUstensils = getUniqueUstensils(filteredRecipes);
console.log({uniqueIngredients})
	// Met à jour l'affichage de chaque dropdown
	displayList(uniqueIngredients, "ingredients-list", filterAfterAddTag);
	displayList(uniqueAppliances, "appareils-list", filterAfterAddTag);
	displayList(uniqueUstensils, "ustensiles-list", filterAfterAddTag);
}

function getUniqueIngredients(recipes) {
	//pour ingredients-button
	const ingredients = new Set(
		recipes
			.map((recipe) =>
				recipe.ingredients.map((recipe) => recipe.ingredient)
			)
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



// Fonction pour rafraîchir les dropdowns avec les nouvelles données triées
/*
export function refreshDropdowns(filteredRecipes) {
    const uniqueIngredients = getUniqueIngredients(filteredRecipes);
    const uniqueAppliances = getUniqueAppliances(filteredRecipes);
    const uniqueUstensils = getUniqueUstensils(filteredRecipes);

    // Mettez à jour l'affichage de chaque dropdown avec les nouvelles données triées
    displayList(uniqueIngredients, "ingredients-list", filterAfterAddTag);
    displayList(uniqueAppliances, "appareils-list", filterAfterAddTag);
    displayList(uniqueUstensils, "ustensiles-list", filterAfterAddTag);
}*/


// Fonction pour rechercher et afficher les recettes en fonction de la saisie de l'utilisateur
/*
const searchByValue = (recipes) => {
    getSearchBarValue((inputValue) => {
        searchGlobal = inputValue;

        // Filtrez les recettes seulement si la saisie est valide
        if (inputValue.length >= 3 || inputValue === "") {
            let filteredRecipes = filterRecipes({
                recipes,
                searchGlobal,
                searchAppareil,
                searchIngredients,
                searchUstensils,
            });

            displayRecipes(filteredRecipes);
            refreshDropdowns(filteredRecipes); // Mettez à jour les dropdowns avec les nouvelles données triées
        }
    });
};*/



function displayList(items, containerId, filterAfterAddTag) {
	const displayArea = document.getElementById(containerId);

	if (!displayArea) {
		console.error(`Le conteneur ${containerId} n'a pas été trouvé.`);

		return;
	}
console.log({items})
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

			filterAfterAddTag(value, type);
			///////////////////////

			const dropdownContent = displayArea
				.closest(".dropdown")
				.querySelector(".dropdown-content");
			dropdownContent.style.display = "none"; // ne plus afficher la liste
		});
	});
}
