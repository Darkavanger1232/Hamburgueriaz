// ESPERA CARREGAR
window.onload = () => {

    // REMOVE LOADING
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 800);

    // BOTÃO LOGIN
    document.getElementById("btnLogin").addEventListener("click", login);
};

// LOGIN
function login(){

    const btn = document.getElementById("btnLogin");
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if(!email || !senha){
        alert("Preencha email e senha");
        return;
    }

    btn.innerText = "Entrando...";
    btn.disabled = true;

    auth.signInWithEmailAndPassword(email, senha)
    .then(() => {

        document.body.style.opacity = "0";

        setTimeout(() => {
            window.location.href = "inicio.html";
        }, 500);

    })
    .catch(() => {
        alert("Login inválido");
        btn.innerText = "Entrar";
        btn.disabled = false;
    });
}
