// 🔥 CONFIG FIREBASE
const firebaseConfig = {
  apiKey: "SUA_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_ID",
};

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
