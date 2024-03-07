export function getRecipeCard(data) {
  const { id, image, name, servings, ingredients, description, time } = data;

  const article = document.createElement("article");
  article.setAttribute("id", `recipe-${id}`);
  article.setAttribute("data-servings", servings);

  const blankImage = document.createElement("div");
  blankImage.classList.add("recipe-image");
  if (image) {
    const imgElement = document.createElement("img");
    imgElement.src = `img/recipes/${image}`;
    imgElement.alt = `Image de ${name}`;
    blankImage.appendChild(imgElement);
  }
  article.appendChild(blankImage);

   const timeElement = document.createElement("p");
  timeElement.textContent = ` ${time} min`;
  article.appendChild(timeElement);
  timeElement.classList.add("recipe-time");


  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  const recipeName = document.createElement("h2");
  recipeName.textContent = name;
  recipeName.className = "recipe-name";
  cardHeader.appendChild(recipeName);
  article.appendChild(cardHeader);

  const recipeText = document.createElement("div");
  recipeText.textContent = "RECETTE";
  recipeText.className = "recipe-text";
  article.appendChild(recipeText);

  const descriptionParagraph = document.createElement("p");
  descriptionParagraph.textContent = description;
  descriptionParagraph.className = "recipe-description";
  article.appendChild(descriptionParagraph);

  const recipeIngredients = document.createElement("div");
  recipeIngredients.textContent = "INGRÉDIENTS";
  recipeIngredients.className = "recipe-ingredients-title";
  article.appendChild(recipeIngredients);

  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "ingredients-list";
  ingredients.forEach((ingredient) => {
    const item = document.createElement("li");
    item.className = "ingredient";

    const nameSpan = document.createElement("span");
    nameSpan.className = "ingredient-name";
    nameSpan.textContent = ingredient.ingredient;
    item.appendChild(nameSpan);

    // Regroupe quantity et unit dans un seul span si quantity est présent
    if (ingredient.quantity || ingredient.unit) {
      const detailsSpan = document.createElement("span");
      detailsSpan.className = "ingredient-details";
      let detailsText = ingredient.quantity ? `${ingredient.quantity}` : "";
      detailsText += ingredient.unit ? ` ${ingredient.unit}` : "";
      detailsSpan.textContent = detailsText;
      item.appendChild(detailsSpan);
     
    }
    ingredientsList.appendChild(item);
  });
  article.appendChild(ingredientsList);

  return article;
}
