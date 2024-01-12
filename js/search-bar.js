// search-bar.js
searchBtn.addEventListener('click', function () {
    const pokemonName = searchInput.value.toLowerCase().trim();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon non trouvé');
            }
            return response.json();
        })
        .then(data => {
            detailsElement.innerHTML = `<h3>${data.name.toUpperCase()}</h3>
                                        <img src="${data.sprites.front_default}" alt="${data.name}">`;

            const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase() === pokemonName);
            displayPokemonList(filteredList);
        })
        .catch(error => {
            detailsElement.innerHTML = `<p>${error.message}</p>`;
        });
});
