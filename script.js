let quantidade = 1;
let carrinho = [];

function login() {
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    if (email === "" || senha === "") {
        alert("Preencha todos os campos!");
        return;
    }

    // Login simples
    if (email === "admin" && senha === "123") {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
    } else {
        alert("Login inválido!");
    }
}

function somar() {
    quantidade++;
    atualizar();
}

function subtrair() {
    if (quantidade > 1) {
        quantidade--;
        atualizar();
    }
}

function atualizar() {
    document.getElementById("quantidade").innerText = quantidade;
    atualizarPreco();
}

function atualizarPreco() {
    let precoBase = 20;

    if (document.getElementById("bacon").checked) precoBase += 2;
    if (document.getElementById("queijo").checked) precoBase += 2;
    if (document.getElementById("onion").checked) precoBase += 3;

    let total = precoBase * quantidade;
    document.getElementById("preco").innerText = total.toFixed(2);
}

// Atualiza preço ao marcar opções
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input[type=checkbox]").forEach(cb => {
        cb.addEventListener("change", atualizarPreco);
    });
});

function adicionarCarrinho() {
    let nome = document.getElementById("nome").value.trim();

    if (!nome) {
        alert("Digite seu nome!");
        return;
    }

    let adicionais = [];

    if (bacon.checked) adicionais.push("Bacon");
    if (queijo.checked) adicionais.push("Queijo");
    if (onion.checked) adicionais.push("Onion Rings");

    let total = document.getElementById("preco").innerText;

    carrinho.push({
        nome,
        adicionais,
        quantidade,
        total
    });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("carrinho");
    lista.innerHTML = "";

    carrinho.forEach(p => {
        let li = document.createElement("li");

        li.innerText = `${p.nome} | ${p.quantidade}x | ${p.adicionais.join(", ") || "Sem adicionais"} | R$ ${p.total}`;

        lista.appendChild(li);
    });
}

function enviarPedido() {
    if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let mensagem = "Pedido HamburgueriaZ:\n\n";

    carrinho.forEach(p => {
        mensagem += `${p.nome} - ${p.quantidade}x - ${p.adicionais.join(", ") || "Sem adicionais"} - R$ ${p.total}\n`;
    });

    let link = `mailto:?subject=Pedido HamburgueriaZ&body=${encodeURIComponent(mensagem)}`;

    window.location.href = link;
}