// tri-lvl.js
function sortPokemonByLevel(sortOrder) {
    pokemonList.sort((a, b) => {
        return sortOrder === 'asc' ? a.level - b.level : b.level - a.level;
    });

    displayPokemonList(pokemonList);
}

levelSort.addEventListener('change', function () {
    const sortOrder = levelSort.value;
    sortPokemonByLevel(sortOrder);
});
