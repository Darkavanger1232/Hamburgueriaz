let modoCadastro = false;

function toggleMode(){
    modoCadastro = !modoCadastro;

    nome.style.display = modoCadastro ? "block" : "none";
    titulo.innerText = modoCadastro ? "Cadastro" : "Login";
}

function acaoPrincipal(){
    modoCadastro ? cadastrar() : login();
}

function cadastrar(){

    if(!nome.value || !email.value || !senha.value){
        alert("Preencha tudo");
        return;
    }

    auth.createUserWithEmailAndPassword(email.value, senha.value)
    .then(user => {

        return db.collection("usuarios").doc(user.user.uid).set({
            nome: nome.value,
            email: email.value
        });

    })
    .then(()=>{
        alert("Conta criada!");
        toggleMode();
    });
}

function login(){
    auth.signInWithEmailAndPassword(email.value, senha.value)
    .then(()=>{
        window.location.href = "inicio.html";
    })
    .catch(()=> alert("Erro login"));
}
