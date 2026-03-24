let carrinho = [];

// 🍔 CARDÁPIO DINÂMICO
const hamburgueres = [
    { nome: "Clássico", preco: 20 },
    { nome: "Cheddar Bacon", preco: 25 },
    { nome: "Duplo Smash", preco: 30 },
    { nome: "Vegano", preco: 22 }
];

// ➕ ADICIONAIS
const adicionais = [
    { nome: "Bacon", preco: 2 },
    { nome: "Queijo", preco: 2 },
    { nome: "Onion Rings", preco: 3 },
    { nome: "Molho Especial", preco: 1 }
];

// 🔐 LOGIN
function login(){
    let e = email.value;
    let s = senha.value;

    if(e === "admin" && s === "123"){
        login.style.display = "none";
        app.style.display = "block";
        carregarCardapio();
    } else {
        alert("Login inválido");
    }
}

// 🍔 CRIA CARDÁPIO
function carregarCardapio(){
    let div = document.getElementById("cardapio");
    div.innerHTML = "";

    hamburgueres.forEach((h, index) => {

        let extrasHTML = adicionais.map(a =>
            `<label><input type="checkbox" value="${a.preco}"> ${a.nome} (+${a.preco})</label><br>`
        ).join("");

        div.innerHTML += `
        <div class="card">
            <h3>${h.nome}</h3>
            <p>R$ ${h.preco}</p>

            <div>${extrasHTML}</div>

            <button onclick="addCarrinho(${index}, this)">Adicionar</button>
        </div>
        `;
    });
}

// 🛒 ADICIONAR AO CARRINHO
function addCarrinho(index, btn){

    let card = btn.parentElement;
    let checks = card.querySelectorAll("input[type=checkbox]");

    let total = hamburgueres[index].preco;
    let extras = [];

    checks.forEach(c => {
        if(c.checked){
            total += parseInt(c.value);
            extras.push(c.parentElement.innerText);
        }
    });

    carrinho.push({
        nome: hamburgueres[index].nome,
        extras: extras,
        preco: total
    });

    atualizarCarrinho();
}

// 🔄 ATUALIZA CARRINHO
function atualizarCarrinho(){
    let lista = document.getElementById("carrinho");
    let totalFinal = 0;

    lista.innerHTML = "";

    carrinho.forEach(p => {

        totalFinal += p.preco;

        let li = document.createElement("li");
        li.innerText = `${p.nome} - ${p.extras.join(", ") || "Sem extras"} - R$ ${p.preco}`;
        lista.appendChild(li);
    });

    document.getElementById("totalFinal").innerText = totalFinal;
}

// 📧 FINALIZAR
function enviarPedido(){
    if(carrinho.length === 0){
        alert("Carrinho vazio!");
        return;
    }

    let msg = "Pedido HamburgueriaZ:\n\n";

    carrinho.forEach(p => {
        msg += `${p.nome} - ${p.extras.join(", ") || "Sem extras"} - R$ ${p.preco}\n`;
    });

    window.location.href = `mailto:?subject=Pedido&body=${encodeURIComponent(msg)}`;
}