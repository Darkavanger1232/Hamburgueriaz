// LOGIN
function login(){

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    auth.signInWithEmailAndPassword(email, senha)
    .then(()=>{
        window.location.href = "inicio.html";
    })
    .catch(()=>{
        alert("Erro no login");
    });
}

// MENU
function toggleMenu(){
    document.getElementById("menu").classList.toggle("ativo");
}

// FINALIZAR
function finalizarPedido(){

    let endereco = document.getElementById("endereco").value;
    let telefone = document.getElementById("telefone").value;

    if(!endereco || !telefone){
        alert("Preencha tudo");
        return;
    }

    alert("Pedido confirmado! 🍔 Tempo: 30 min");
}

// ADMIN
function addProduto(){

    let nome = document.getElementById("nome").value;
    let preco = document.getElementById("preco").value;
    let img = document.getElementById("img").value;

    db.collection("produtos").add({
        nome,
        preco,
        img
    });

    alert("Produto adicionado!");
}
