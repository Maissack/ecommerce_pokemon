document.addEventListener('DOMContentLoaded', function () {
    const productPageBtn = document.getElementById('product-page-btn');
    const cartPageBtn = document.getElementById('cart-page-btn');

    // Redirection vers la page produit
    productPageBtn.addEventListener('click', function () {
        window.location.href = 'produits.html'; 
    });

    // Redirection vers la page panier
    cartPageBtn.addEventListener('click', function () {
        window.location.href = 'panier.html'; 
    });
});

