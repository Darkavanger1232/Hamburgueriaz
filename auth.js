function toggleCadastro(){
    const box = document.getElementById("cadastroBox");
    box.style.display = box.style.display === "none" ? "block" : "none";
}

// LOGIN
function login(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
        window.location.href = "home.html";
    })
    .catch(err => alert(err.message));
}

// CADASTRO
function cadastrar(){
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("emailCad").value;
    const senha = document.getElementById("senhaCad").value;

    auth.createUserWithEmailAndPassword(email, senha)
    .then(user => {
        return db.collection("usuarios").doc(user.user.uid).set({
            nome: nome,
            email: email
        });
    })
    .then(() => {
        alert("Conta criada!");
    })
    .catch(err => alert(err.message));
}
