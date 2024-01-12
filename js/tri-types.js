// tri-types.js
function fillTypeFilterOptions(types) {
    typeFilter.innerHTML = '<option value="">Tous les types</option>';

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
}

typeFilter.addEventListener('change', function () {
    const selectedType = typeFilter.value;

    if (selectedType === '') {
        displayPokemonList(pokemonList);
    } else {
        const filteredList = pokemonList.filter(pokemon => pokemon.type === selectedType);
        displayPokemonList(filteredList);
    }
});
