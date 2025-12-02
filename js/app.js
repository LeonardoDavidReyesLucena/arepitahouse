/* =========================================
   SISTEMA DE CARRITO AREPITAHOUSE
   - Compatible 100% con GitHub Pages
========================================= */

// Inicializamos carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* =========================================
   ACTUALIZAR CONTADOR
========================================= */
function updateCartCount() {
    const counter = document.getElementById("cart-count");
    if (counter) counter.textContent = cart.length;
}
updateCartCount();

/* =========================================
   AÑADIR AL CARRITO
========================================= */
window.addToCart = function(product) {

    const user = localStorage.getItem("user");
    if (!user) {
        showLoginRequired();
        return;
    }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    animateCartIcon();
};

/* =========================================
   ANIMACIÓN ICONO
========================================= */
function animateCartIcon() {
    const icon = document.querySelector(".cart-icon");
    if (!icon) return;

    icon.style.transform = "scale(1.25)";
    setTimeout(() => icon.style.transform = "scale(1)", 200);
}

/* =========================================
   MENSAJE "Inicia sesión"
========================================= */
function showLoginRequired() {
    let div = document.createElement("div");
    div.id = "login-required";
    div.textContent = "Inicia sesión para añadir productos ❤️";
    div.style.position = "fixed";
    div.style.bottom = "30px";
    div.style.right = "30px";
    div.style.background = "#000";
    div.style.color = "#fff";
    div.style.padding = "14px 20px";
    div.style.borderRadius = "8px";
    div.style.zIndex = "9999";
    div.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 2500);
}

/* =========================================
   MOSTRAR CARRITO
========================================= */
window.loadCart = function() {
    const box = document.getElementById("cart-items");
    const totalBox = document.getElementById("cart-total");

    if (!box) return;

    box.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += Number(item.price);

        box.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="cart-details">
                    <h4>${item.name}</h4>
                    <p>${item.price}€</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
    });

    if (totalBox) totalBox.textContent = total.toFixed(2) + "€";
};

/* =========================================
   ELIMINAR PRODUCTO
========================================= */
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    loadCart();
};

/* =========================================
   VACIAR CARRITO (logout)
========================================= */
window.clearCart = function() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartCount();
};
