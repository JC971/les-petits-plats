export const getSearchBarValue = (callback) => {
	const inputElement = document.querySelector('input[type="text"]');

	inputElement.addEventListener("input", function (event) {
		const value = event.target.value.trim().toLowerCase();

		callback(value);
	});
};
