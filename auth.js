function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
        window.location.href = "home.html";
    })
    .catch(err => alert("Erro: " + err.message));
}

function cadastrar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.createUserWithEmailAndPassword(email, senha)
    .then(() => {
        alert("Conta criada com sucesso!");
    })
    .catch(err => alert("Erro: " + err.message));
}
