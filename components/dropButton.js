
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
		})
		.catch(console.error);
});

function getUniqueIngredients() {//pour ingredients-button
	const ingredients = new Set(
		recipes
			.map((recipe) =>
				recipe.ingredients.map((ingredient) => ingredient.ingredient)
			)
			.flat()
		
	);
	  
	return Array.from(ingredients);
}

function getUniqueAppliances() {//pour appareils-list
	
	const appliances = new Set(recipes.map((recipe) => recipe.appliance));


	return Array.from(appliances);
	
}
/////////////////////

function getUniqueUstensils() {//ustensiles dans un sous tableau
	const ustensils = new Set(recipes.map((recipe) => recipe.ustensils).flat());
	console.log(ustensils)
	return Array.from(ustensils);
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
        // Création d'un élément de tag (ici un <div> pour l'exemple)
        const tag = document.createElement("div");
        
        tag.textContent = item; // Texte du tag
        tag.classList.add("dropdown-item", "tag-style"); // Ajoutez 'tag-style' pour personnaliser l'apparence
        displayArea.appendChild(tag); // Ajout du tag

        // Gestionnaire de clic sur le tag
        tag.addEventListener('click', function() {
           const searchInput = displayArea.closest('.dropdown').querySelector('.dropdown-search');
           searchInput.value = this.textContent; 
           // toggleDropdown(displayArea.closest('.dropdown').classList[1]); 
        });
    });
}


//filtrer la liste elimine les elements qui ne correspondent pas a la recherche

document.querySelectorAll('.dropdown-search').forEach(input => {
    input.addEventListener('input', function() {
        const filterText = this.value.toLowerCase();
        const listId = this.closest('.dropdown').querySelector('.dropdown-content').id;
        const listItems = document.querySelectorAll(`#${listId} .dropdown-item`);
        
        listItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(filterText)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
			}
		
        });
    });
});














