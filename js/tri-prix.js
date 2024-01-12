// tri-prix.js
function sortPokemonByPrice(sortOrder) {
    pokemonList.sort((a, b) => {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    });

    displayPokemonList(pokemonList);
}

priceSortOrder.addEventListener('change', function () {
    const sortOrder = priceSortOrder.value;
    sortPokemonByPrice(sortOrder);
});
