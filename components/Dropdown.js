function addTagToSection(tagName, type, remove) {
    const tagsSection = document.querySelector(".tags");
    const tagElement = document.createElement("div");
    tagElement.className = "tag";

    const tagText = document.createElement("span");
    tagText.textContent = tagName;
    tagElement.appendChild(tagText);

    const closeButton = document.createElement("span");
    closeButton.textContent = "×"; //fermeture tag
    closeButton.className = "close-button";
    closeButton.addEventListener("click", function () {
        remove(tagName, type);
        tagElement.remove();

        //fermeture dropdown-search en meme tps tag
        const searchInputs = document.querySelectorAll(".dropdown-search");
        for (let i = 0; i < searchInputs.length; i++) {
            searchInputs[i].style.display = "none";
        }
    });
    tagElement.appendChild(closeButton);

    tagsSection.appendChild(tagElement);
}

export const displayDropdown = (recipes, filterAfterAddTag, remove) => {

    document.getElementById("ingredients-list").innerHTML = "";

    const dropdowns = [
        { id: "ingredients-list", items: getUniqueIngredients(recipes) },
        { id: "appareils-list", items: getUniqueAppliances(recipes) },
        { id: "ustensiles-list", items: getUniqueUstensils(recipes) }
    ];

    for (let i = 0; i < dropdowns.length; i++) {
        const { id, items } = dropdowns[i];
        displayList(items, id, filterAfterAddTag, remove);
    }

    const searchInputs = document.querySelectorAll(".dropdown-search");
    for (let i = 0; i < searchInputs.length; i++) {
        searchInputs[i].addEventListener("input", filterDropdownTags);
    }

    const buttons = document.querySelectorAll(".dropdown-button");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            const buttonClass = this.classList[1];
            toggleDropdown(buttonClass);
        });
    }
};

function toggleDropdown(buttonClass) {
    const dropdown = document
        .querySelector(`.${buttonClass}`)
        .closest(".dropdown");
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

    const tags = dropdownContent.querySelectorAll(".dropdown-item");
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        tag.style.display = tag.textContent.toLowerCase().includes(filterText) ? "" : "none";
    }
}

export function refreshDropdowns(filteredRecipes, filterAfterAddTag) {
    const dropdowns = [
        { id: "ingredients-list", items: getUniqueIngredients(filteredRecipes) },
        { id: "appareils-list", items: getUniqueAppliances(filteredRecipes) },
        { id: "ustensiles-list", items: getUniqueUstensils(filteredRecipes) }
    ];

    for (let i = 0; i < dropdowns.length; i++) {
        const { id, items } = dropdowns[i];
        displayList(items, id, filterAfterAddTag);
    }
}

function getUniqueIngredients(recipes) {
    const ingredients = new Set(
        recipes.flatMap((recipe) => recipe.ingredients.map((recipe) => recipe.ingredient))
    );
    return Array.from(ingredients);
}

function getUniqueUstensils(recipes) {
    const ustensils = new Set(recipes.flatMap((recipe) => recipe.ustensils).flat());
    return Array.from(ustensils);
}

function getUniqueAppliances(recipes) {
    const appliances = new Set(recipes.map((recipe) => recipe.appliance));
    return Array.from(appliances);
}

function displayList(items, containerId, filterAfterAddTag, remove) {
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
            addTagToSection(value, type, remove);
            filterAfterAddTag(value, type);
            displayArea.closest(".dropdown").querySelector(".dropdown-content").style.display = "none";
        });
    }
}
