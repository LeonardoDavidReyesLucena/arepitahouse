/* ============================================================
   PayPal — Pago dinámico para AREPITAHOUSE
   - Obtiene el total del carrito
   - Crea la orden en PayPal
   - Captura el pago
   - Limpia el carrito después del pago
============================================================ */

// Cargar carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Calcular total
function getTotal() {
    let total = 0;
    cart.forEach(item => {
        total += Number(item.price);
    });
    return total.toFixed(2);
}

// Cargar PayPal
document.addEventListener("DOMContentLoaded", () => {
    const total = getTotal();

    // Si no hay contenedor PayPal, salir
    const paypalBox = document.getElementById("paypal-button-container");
    if (!paypalBox) return;

    paypal.Buttons({
        createOrder: (data, actions) => {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: total }
                }]
            });
        },

        onApprove: (data, actions) => {
            return actions.order.capture().then(function(details) {

                // Limpia carrito
                localStorage.removeItem("cart");

                // Mensaje bonito
                alert("Pago completado ✔ Gracias por tu compra ❤️");

                // Redirige a la home
                window.location.href = "index.html";
            });
        },

        onError: (err) => {
            alert("Ocurrió un error procesando el pago.");
        }

    }).render("#paypal-button-container");
});
