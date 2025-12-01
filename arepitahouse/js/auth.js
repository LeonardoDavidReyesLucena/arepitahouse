/* ============================================================
   AUTH.JS — SISTEMA DE LOGIN AREPITAHOUSE
   - Registro
   - Login
   - Google Login
   - Persistencia
   - Perfil
   - Logout
   - Protección del carrito
============================================================ */

/* ---- IMPORTS FIREBASE ---- */
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


/* ---- CONFIGURACIÓN DE FIREBASE (TU CONFIG) ---- */
const firebaseConfig = {
  apiKey: "AIzaSyB2OVPYY-_E3gdn6n19Q9aWPMUmWMszqL4",
  authDomain: "arepitahouse.firebaseapp.com",
  projectId: "arepitahouse",
  storageBucket: "arepitahouse.firebasestorage.app",
  messagingSenderId: "990542047150",
  appId: "1:990542047150:web:bf6e234512c078dd0a0a3f"
};

/* ---- INICIALIZAR FIREBASE ---- */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


/* ============================================================
   REGISTRO DE USUARIO
============================================================ */
window.registerUser = function () {
    const email = document.getElementById("reg-email").value;
    const pass = document.getElementById("reg-pass").value;

    createUserWithEmailAndPassword(auth, email, pass)
        .then(() => {
            alert("Cuenta creada con éxito ❤️   Ahora inicia sesión.");
            window.location.href = "login.html";
        })
        .catch(err => alert(err.message));
};


/* ============================================================
   LOGIN CON EMAIL
============================================================ */
window.loginUser = function () {
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-pass").value;

    signInWithEmailAndPassword(auth, email, pass)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(err => alert(err.message));
};


/* ============================================================
   LOGIN CON GOOGLE
============================================================ */
window.loginGoogle = function () {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(err => alert(err.message));
};


/* ============================================================
   DETECTAR USUARIO LOGUEADO
============================================================ */
onAuthStateChanged(auth, user => {
    if (user) {
        // Guardamos datos del usuario localmente
        localStorage.setItem("user", JSON.stringify({
            name: user.displayName || "Usuario",
            email: user.email,
            img: user.photoURL
        }));

        // Actualiza el icono del usuario en el header
        updateUserUI();
    } else {
        localStorage.removeItem("user");
        clearCart(); // Vacía el carrito si cierra sesión
        updateUserUI();
    }
});


/* ============================================================
   ACTUALIZAR LA UI DEL HEADER
============================================================ */
function updateUserUI() {
    const user = JSON.parse(localStorage.getItem("user"));
    const loginBtn = document.getElementById("login-btn");
    const profileBtn = document.getElementById("profile-btn");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (profileBtn) {
            profileBtn.style.display = "inline-block";
            profileBtn.textContent = "👤 " + user.name;
        }
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (profileBtn) profileBtn.style.display = "none";
    }
}


/* ============================================================
   CERRAR SESIÓN
============================================================ */
window.logoutUser = function () {
    signOut(auth)
        .then(() => {
            localStorage.removeItem("user");
            clearCart(); // Limpia carrito
            window.location.href = "index.html";
        });
};


/* ============================================================
   CARGAR PERFIL EN perfil.html
============================================================ */
window.loadProfile = function () {
    const box = document.getElementById("profile-box");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    box.innerHTML = `
        <h2>Mi Perfil</h2>
        <img src="${user.img || 'https://i.imgur.com/7kG6VXa.png'}" 
             style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:20px;">
        <p><strong>Nombre:</strong> ${user.name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <button class="logout-btn" onclick="logoutUser()">Cerrar sesión</button>
    `;
};
