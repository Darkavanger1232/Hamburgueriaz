// 🔥 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBtNslNlc5wm5hg11bp_K4oyMCCG0-pO0w",
  authDomain: "hamburgueriaz-ede35.firebaseapp.com",
  projectId: "hamburgueriaz-ede35",
  storageBucket: "hamburgueriaz-ede35.firebasestorage.app",
  messagingSenderId: "463524468857",
  appId: "1:463524468857:web:a430a08a93c02dc0cadca8",
  measurementId: "G-H1XJJ2WPBJ"

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🔐 LOGIN
function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
        window.location.href = "home.html";
    })
    .catch(error => {
        alert("Erro: " + error.message);
    });
}

// 🆕 CADASTRO
function cadastrar() {
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("emailCad").value;
    let senha = document.getElementById("senhaCad").value;

    auth.createUserWithEmailAndPassword(email, senha)
    .then(() => {
        alert("Cadastro realizado!");
        mostrarLogin();
    })
    .catch(error => {
        alert("Erro: " + error.message);
    });
}

// 🔄 TROCAR TELAS
function mostrarCadastro(){
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("cadastroBox").style.display = "block";
}

function mostrarLogin(){
    document.getElementById("loginBox").style.display = "block";
    document.getElementById("cadastroBox").style.display = "none";
}
