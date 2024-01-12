function updateCartDisplay() {
    // Récupérer l'élément du panier sur la page panier.html
    const cartElement = document.getElementById('cart-elements');
    const totalPriceElement = document.getElementById('total-price');

    // Effacer le contenu actuel du panier
    cartElement.innerHTML = '';

    // Récupérer le panier depuis le stockage local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Afficher chaque Pokémon dans le panier
    cart.forEach(pokemon => {
        const pokemonElement = document.createElement('div');
        pokemonElement.innerHTML = `<img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                                    <p>${pokemon.name}</p>
                                    <p>Type: ${pokemon.type}</p>
                                    <p>Niveau: ${pokemon.level}</p>
                                    <p>Prix: ${pokemon.price} €</p>
                                    <button class="remove-btn">Supprimer</button>`;
        cartElement.appendChild(pokemonElement);

        // Ajouter un gestionnaire d'événements pour le bouton "Supprimer"
        const removeBtn = pokemonElement.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function () {
            removeFromCart(pokemon);
            updateCartDisplay(); // Mettre à jour l'affichage après la suppression
        });
    });

    // Calculer le total du panier
    const totalPrice = cart.reduce((total, pokemon) => {
        total += pokemon.price;
        return total;
    }, 0);

    // Afficher le total du panier
    totalPriceElement.textContent = `Total du panier : ${totalPrice} €`;
}

// ... (autres fonctions)

// Mettre à jour l'affichage du panier lors du chargement initial
updateCartDisplay();


// main-poke.js (ou le fichier où vous avez la fonction addToCart)

function addToCart(pokemon) {
    // Récupérer le panier actuel depuis le stockage local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Ajouter le Pokémon au panier
    cart.push(pokemon);

    // Enregistrer le panier mis à jour dans le stockage local
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage sur la page panier.html
    updateCartDisplay();
}

// ... (autres fonctions)


function removeFromCart(pokemon) {
    // Récupérer le panier actuel depuis le stockage local
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Retirer le Pokémon du panier
    const updatedCart = cart.filter(item => item.name !== pokemon.name);

    // Enregistrer le panier mis à jour dans le stockage local
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Mettre à jour l'affichage sur la page panier.html
    updateCartDisplay();
}

// Mettre à jour l'affichage du panier lors du chargement initial
updateCartDisplay();