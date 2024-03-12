export const getSearchBarValue = () => {
  const inputElement = document.querySelector('input[type="text"]');
  const values = []; 
  
  // Ajouter un écouteur d'événement à l'élément d'entrée
  inputElement.addEventListener("input", function (event) {
    const value = event.target.value.trim().toLowerCase();
    values.push(value); 
  });

  // Retourne une fonction qui renvoie  les valeurs tapees
  return () => {
    return values;
  };
};
