/* =========================================
   SISTEMA DE CARRITO PARA AREPITAHOUSE
   - Carrito en localStorage
   - Contador dinámico tipo Amazon
   - Añadir / eliminar items
   - Protección: requiere login
========================================= */

// Inicializamos carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Muestra el número de productos en el icono
function updateCartCount() {
    const count = cart.length;
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = count;
}

updateCartCount();

/* =========================================
   AÑADIR AL CARRITO (requiere login)
========================================= */
function addToCart(product) {

    // Comprobación de login
    const user = localStorage.getItem("user");
    if (!user) {
        showLoginRequired();
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    animateCartIcon();
}

/* =========================================
   ANIMACIÓN AL AÑADIR PRODUCTO
========================================= */
function animateCartIcon() {
    const icon = document.querySelector(".cart-icon");
    icon.classList.add("pop");

    setTimeout(() => icon.classList.remove("pop"), 300);
}

/* =========================================
   MENSAJE SUAVE "INICIA SESIÓN"
========================================= */
function showLoginRequired() {
    let box = document.getElementById("login-required");

    if (!box) {
        const div = document.createElement("div");
        div.id = "login-required";
        div.textContent = "Inicia sesión para añadir productos ❤️";
        div.style.position = "fixed";
        div.style.bottom = "30px";
        div.style.right = "30px";
        div.style.background = "#000";
        div.style.color = "#fff";
        div.style.padding = "14px 20px";
        div.style.borderRadiu

// Limpia el carrito completamente
function clearCart() {
    localStorage.removeItem("cart");
    updateCartIcon();
}

window.clearCart = clearCart;
