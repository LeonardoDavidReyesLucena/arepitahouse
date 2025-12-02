/* ============================================================
   SISTEMA DE CARRITO — AREPITAHOUSE
   Funciona en GitHub Pages y con Firebase Auth
============================================================ */

/* -------------------------------
   LEER CARRITO DESDE LOCALSTORAGE
--------------------------------*/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

/* -------------------------------
   GUARDAR CARRITO
--------------------------------*/
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

/* -------------------------------
   AÑADIR PRODUCTO AL CARRITO
--------------------------------*/
window.addToCart = function (name, price, image) {
    const cart = getCart();

    cart.push({
        name,
        price,
        image
    });

    saveCart(cart);

    alert("Producto añadido al carrito 🛒");
};

/* -------------------------------
   LIMPIAR CARRITO (solo logout)
--------------------------------*/
window.clearCart = function () {
    localStorage.removeItem("cart");
    updateCartCount();
};

/* -------------------------------
   ACTUALIZAR CONTADOR
--------------------------------*/
function updateCartCount() {
    const cart = getCart();
    const count = cart.length;

    const bubble = document.getElementById("cart-count");

    if (bubble) bubble.textContent = count;
}

/* -------------------------------
   CARGAR CARRITO EN carrito.html
--------------------------------*/
window.loadCart = function () {
    const cart = getCart();
    const container = document.getElementById("cart-items");
    const totalEl = document.getElementById("cart-total");

    if (!container || !totalEl) return;

    container.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        total += Number(item.price);

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" class="cart-img">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price}€</p>
                </div>
            </div>
        `;
    });

    totalEl.textContent = total + "€";

    updateCartCount();
};

/* -------------------------------
   INICIALIZACIÓN GENERAL
--------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
});
