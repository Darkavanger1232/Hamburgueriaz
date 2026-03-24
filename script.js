let quantidade = 1;
let carrinho = [];

function login() {
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if (email === "admin" && senha === "123") {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        alert("Login inválido");
    }
}

function somar() {
    quantidade++;
    atualizar();
}

function subtrair() {
    if (quantidade > 1) quantidade--;
    atualizar();
}

function atualizar() {
    document.getElementById("quantidade").innerText = quantidade;
    atualizarPreco();
}

function atualizarPreco() {
    let preco = 20;

    if (document.getElementById("bacon").checked) preco += 2;
    if (document.getElementById("queijo").checked) preco += 2;
    if (document.getElementById("onion").checked) preco += 3;

    document.getElementById("preco").innerText = preco * quantidade;
}

document.querySelectorAll("input[type=checkbox]").forEach(cb => {
    cb.addEventListener("change", atualizarPreco);
});

function adicionarCarrinho() {
    let nome = document.getElementById("nome").value;

    if (!nome) {
        alert("Digite seu nome!");
        return;
    }

    let total = document.getElementById("preco").innerText;

    carrinho.push({
        nome: nome,
        qtd: quantidade,
        total: total
    });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("carrinho");
    lista.innerHTML = "";

    carrinho.forEach(p => {
        let li = document.createElement("li");
        li.innerText = `${p.nome} - ${p.qtd}x - R$ ${p.total}`;
        lista.appendChild(li);
    });
}

function enviarPedido() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let mensagem = "Pedidos:\n";

    carrinho.forEach(p => {
        mensagem += `${p.nome} - ${p.qtd}x - R$ ${p.total}\n`;
    });

    let link = `mailto:?subject=Pedido HamburgueriaZ&body=${encodeURIComponent(mensagem)}`;

    window.location.href = link;
}