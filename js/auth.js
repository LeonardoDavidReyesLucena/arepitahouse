/* ============================================================
   AUTH.JS — LOGIN / REGISTRO / PERFIL / LOGOUT
   COMPATIBLE 100% CON GITHUB PAGES
============================================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

/* ---- CONFIG FIREBASE ---- */
const firebaseConfig = {
    apiKey: "AIzaSyB2OVPYY-_E3gdn6n19Q9aWPMUmWMszqL4",
    authDomain: "arepitahouse.firebaseapp.com",
    projectId: "arepitahouse",
    storageBucket: "arepitahouse.firebasestorage.app",
    messagingSenderId: "990542047150",
    appId: "1:990542047150:web:bf6e234512c078dd0a0a3f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* ============================================================
   REGISTRO
============================================================ */
window.registerUser = function () {
    const email = document.getElementById("reg-email").value;
    const pass  = document.getElementById("reg-pass").value;

    createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
            alert("Cuenta creada 🎉 ¡Ahora inicia sesión!");
            window.location.href = "login.html";
        })
        .catch(err => alert(err.message));
};

/* ============================================================
   LOGIN
============================================================ */
window.loginUser = function () {
    const email = document.getElementById("login-email").value;
    const pass  = document.getElementById("login-pass").value;

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => window.location.href = "index.html")
        .catch(err => alert(err.message));
};

/* ============================================================
   LOGIN GOOGLE
============================================================ */
window.loginGoogle = function () {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then(() => window.location.href = "index.html")
        .catch(err => alert(err.message));
};

/* ============================================================
   DETECTAR USUARIO
============================================================ */
onAuthStateChanged(auth, user => {

    if (user) {
        localStorage.setItem("user", JSON.stringify({
            name: user.displayName || "Usuario",
            email: user.email,
            img: user.photoURL
        }));

        updateUserUI();
    } 
    else {
        localStorage.removeItem("user");

        // 🔥 NO BORRAR EL CARRITO si estamos en carrito.html
        if (!window.location.pathname.includes("carrito.html")) {
            if (typeof clearCart === "function") clearCart();
        }

        updateUserUI();
    }
});

/* ============================================================
   ACTUALIZAR HEADER
============================================================ */
function updateUserUI() {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginBtn   = document.getElementById("login-btn");
    const profileBtn = document.getElementById("profile-btn");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (profileBtn) {
            profileBtn.style.display = "inline-block";
            profileBtn.textContent = "Usuario";
        }
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (profileBtn) profileBtn.style.display = "none";
    }
}

/* ============================================================
   LOGOUT
============================================================ */
window.logoutUser = function () {
    signOut(auth).then(() => {
        localStorage.removeItem("user");
        clearCart();
        window.location.href = "index.html";
    });
};

/* ============================================================
   PERFIL
============================================================ */
window.loadProfile = function () {
    const box  = document.getElementById("profile-box");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return window.location.href = "login.html";

    box.innerHTML = `
        <h2>Mi Perfil</h2>
        <img src="${user.img || 'https://i.imgur.com/7kG6VXa.png'}"
             style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:15px;">
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>

        <button class="logout-btn" onclick="logoutUser()">Cerrar sesión</button>
    `;
};
