document.addEventListener('DOMContentLoaded', function () {
    const mainElement = document.getElementById('pokemon-list');
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('pokemon-name');
    const typeFilter = document.getElementById('type-filter');
    const levelSort = document.getElementById('level-sort');
    const priceSortOrder = document.getElementById('price-sort-order');
    const detailsElement = document.getElementById('pokemon-details');

    let pokemonList = [];

    // Fonction pour générer ou obtenir un niveau aléatoire du cache local
    function generateOrGetFixedLevel(pokemonName) {
        const cachedLevel = localStorage.getItem(`${pokemonName}_level`);
        if (cachedLevel) {
            return parseInt(cachedLevel, 10);
        } else {
            const level = Math.floor(Math.random() * 100) + 1;
            localStorage.setItem(`${pokemonName}_level`, level);
            return level;
        }
    }

    // Fonction pour générer ou obtenir un prix aléatoire du cache local
    function generateOrGetFixedPrice(pokemonName) {
        const cachedPrice = localStorage.getItem(`${pokemonName}_price`);
        if (cachedPrice) {
            return parseInt(cachedPrice, 10);
        } else {
            const price = Math.floor(Math.random() * 100) + 1;
            localStorage.setItem(`${pokemonName}_price`, price);
            return price;
        }
    }


    function displayPokemonList(pokemonArray) {
        mainElement.innerHTML = '';
    
        pokemonArray.forEach(pokemon => {
            const card = document.createElement('div');
            card.classList.add('pokemon-card');
    
            const name = document.createElement('h3');
            name.textContent = `${pokemon.name}`;
    
            const image = document.createElement('img');
            image.src = pokemon.sprites.front_default;
            image.alt = pokemon.name;
    
            const detailsBox = document.createElement('div');
            detailsBox.classList.add('pokemon-details-box');
    
            const detailsTitle = document.createElement('h4');
            detailsTitle.textContent = 'Caractéristiques :';
    
            const detailsList = document.createElement('ul');
            detailsList.classList.add('pokemon-details-list');
    
            // Type
            const typeListItem = document.createElement('li');
            const typeSpan = document.createElement('span');
            typeSpan.textContent = `Type: ${pokemon.type}`;
            typeListItem.appendChild(typeSpan);
            detailsList.appendChild(typeListItem);
    
            // Niveau
            const levelListItem = document.createElement('li');
            const levelSpan = document.createElement('span');
            levelSpan.textContent = `Niveau: ${pokemon.level}`;
            levelListItem.appendChild(levelSpan);
            detailsList.appendChild(levelListItem);
    
            // Prix
            const priceListItem = document.createElement('li');
            const priceSpan = document.createElement('span');
            priceSpan.textContent = `Prix: ${pokemon.price} €`;
            priceListItem.appendChild(priceSpan);
            detailsList.appendChild(priceListItem);
    
            detailsBox.appendChild(detailsTitle);
            detailsBox.appendChild(detailsList);
    
            // Bouton Ajouter au panier
            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Ajouter au panier';
            addToCartBtn.addEventListener('click', function () {
                addToCart(pokemon);
                
            });
    
            card.appendChild(name);
            card.appendChild(image);
            card.appendChild(detailsBox);
            card.appendChild(addToCartBtn);
            mainElement.appendChild(card);
        });
    }
    

    function fillTypeFilterOptions(types) {
        typeFilter.innerHTML = '<option value="">Tous les types</option>';

        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            typeFilter.appendChild(option);
        });
    }

    function sortPokemonByLevel(sortOrder) {
        pokemonList.sort((a, b) => {
            return sortOrder === 'asc' ? a.level - b.level : b.level - a.level;
        });

        displayPokemonList(pokemonList);
    }

    function sortPokemonByPrice(sortOrder) {
        pokemonList.sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });

        displayPokemonList(pokemonList);
    }

    fetch('https://pokeapi.co/api/v2/pokemon/?limit=20')
        .then(response => response.json())
        .then(data => {
            const types = new Set();

            data.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        
                        const level = generateOrGetFixedLevel(pokemonData.name);
                        
                        const price = generateOrGetFixedPrice(pokemonData.name);

                        pokemonList.push({
                            name: pokemonData.name,
                            sprites: pokemonData.sprites,
                            type: pokemonData.types[0].type.name,
                            level: level,
                            price: price,
                        });

                        types.add(pokemonData.types[0].type.name);
                        if (pokemonList.length === data.results.length) {
                            displayPokemonList(pokemonList);
                            fillTypeFilterOptions([...types]);
                        }
                    })
                    .catch(error => console.error('Erreur lors de la récupération des données du Pokémon:', error));
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));

    typeFilter.addEventListener('change', function () {
        const selectedType = typeFilter.value;

        if (selectedType === '') {
            displayPokemonList(pokemonList);
        } else {
            const filteredList = pokemonList.filter(pokemon => pokemon.type === selectedType);
            displayPokemonList(filteredList);
        }
    });

    levelSort.addEventListener('change', function () {
        const sortOrder = levelSort.value;
        sortPokemonByLevel(sortOrder);
    });

    priceSortOrder.addEventListener('change', function () {
        const sortOrder = priceSortOrder.value;
        sortPokemonByPrice(sortOrder);
    });

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

    
});


