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
function login(){
    let email = document.getElementById("emailLogin").value;
    let senha = document.getElementById("senhaLogin").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
        window.location.href = "inicio.html";
    })
    .catch(err => {
        alert("Erro: " + err.message);
    });
}

function cadastrar(){
    let nome = document.getElementById("nomeCadastro").value;
    let email = document.getElementById("emailCadastro").value;
    let senha = document.getElementById("senhaCadastro").value;

    auth.createUserWithEmailAndPassword(email, senha)
    .then(user => {
        return db.collection("usuarios").doc(user.user.uid).set({
            nome: nome,
            email: email
        });
    })
    .then(() => {
        alert("Conta criada!");
        window.location.href = "login.html";
    })
    .catch(err => {
        alert("Erro: " + err.message);
    });
}
