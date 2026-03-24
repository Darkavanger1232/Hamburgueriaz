let carrinho = [];

// 🍔 CARDÁPIO
const hamburgueres = [
    {
        nome: "Clássico",
        preco: 20,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
        nome: "Cheddar Bacon",
        preco: 25,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        nome: "Duplo Smash",
        preco: 30,
        img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086"
    },
    {
        nome: "Vegano",
        preco: 22,
        img: "https://images.unsplash.com/photo-1544025162-d76694265947"
    }
];

// ➕ EXTRAS
const adicionais = [
    { nome: "Bacon", preco: 2 },
    { nome: "Queijo", preco: 2 },
    { nome: "Ovo", preco: 2 },
    { nome: "Cebola", preco: 1 },
    { nome: "Ketchup", preco: 1 },
    { nome: "Mostarda", preco: 1 },
    { nome: "Maionese", preco: 1 },
    { nome: "Barbecue", preco: 2 }
];

// 🥤 BEBIDAS
const bebidas = [
    { nome: "Coca-Cola 1L", preco: 8 },
    { nome: "Coca-Cola 2L", preco: 12 },
    { nome: "Coca-Cola 3L", preco: 15 },
    { nome: "Guaraná 1L", preco: 7 },
    { nome: "Guaraná 2L", preco: 11 }
];

// 🔐 LOGIN
function login(){
    let e = document.getElementById("email").value;
    let s = document.getElementById("senha").value;

    if(e === "admin" && s === "123"){
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
        carregarCardapio();
    } else {
        alert("Login inválido");
    }
}

// 🍔 RENDER CARDÁPIO
function carregarCardapio(){
    let div = document.getElementById("cardapio");
    div.innerHTML = "";

    hamburgueres.forEach((h, index) => {

        let extrasHTML = adicionais.map(a =>
            `<label><input type="checkbox" value="${a.preco}"> ${a.nome} (+${a.preco})</label><br>`
        ).join("");

        let bebidasHTML = bebidas.map(b =>
            `<option value="${b.preco}">${b.nome} (+${b.preco})</option>`
        ).join("");

        div.innerHTML += `
        <div class="card">
            <img src="${h.img}?w=400"
                 onerror="this.src='https://via.placeholder.com/400x250?text=Hamburguer'">

            <h3>${h.nome}</h3>
            <p><strong>R$ ${h.preco}</strong></p>

            <div><strong>Extras:</strong><br>${extrasHTML}</div>

            <div>
                <strong>Bebida:</strong>
                <select>
                    <option value="0">Nenhuma</option>
                    ${bebidasHTML}
                </select>
            </div>

            <div class="qtd">
                <button onclick="diminuir(this)">-</button>
                <span>1</span>
                <button onclick="aumentar(this)">+</button>
            </div>

            <button onclick="addCarrinho(${index}, this)">
                Adicionar
            </button>
        </div>
        `;
    });
}

// ➕ QUANTIDADE
function aumentar(btn){
    let span = btn.parentElement.querySelector("span");
    span.innerText = parseInt(span.innerText) + 1;
}

function diminuir(btn){
    let span = btn.parentElement.querySelector("span");
    let val = parseInt(span.innerText);
    if(val > 1) span.innerText = val - 1;
}

// 🛒 ADICIONAR
function addCarrinho(index, btn){

    let card = btn.parentElement;

    let checks = card.querySelectorAll("input[type=checkbox]");
    let select = card.querySelector("select");
    let qtd = parseInt(card.querySelector(".qtd span").innerText);

    let total = hamburgueres[index].preco;
    let extras = [];

    checks.forEach(c => {
        if(c.checked){
            total += parseInt(c.value);
            extras.push(c.parentElement.innerText);
        }
    });

    let bebida = select.options[select.selectedIndex].text;
    let precoBebida = parseInt(select.value);

    if(precoBebida > 0){
        total += precoBebida;
    }

    total = total * qtd;

    carrinho.push({
        nome: hamburgueres[index].nome,
        extras,
        bebida,
        quantidade: qtd,
        preco: total
    });

    atualizarCarrinho();
}

// 🔄 ATUALIZAR CARRINHO
function atualizarCarrinho(){
    let lista = document.getElementById("carrinho");
    let totalFinal = 0;

    lista.innerHTML = "";

    carrinho.forEach((p, i) => {

        totalFinal += p.preco;

        lista.innerHTML += `
        <li>
            <strong>${p.nome}</strong> x${p.quantidade}<br>
            Extras: ${p.extras.join(", ") || "Nenhum"}<br>
            Bebida: ${p.bebida}<br>
            R$ ${p.preco}
            <button onclick="remover(${i})">❌</button>
        </li>
        `;
    });

    document.getElementById("totalFinal").innerText = totalFinal;
}

// ❌ REMOVER
function remover(i){
    carrinho.splice(i,1);
    atualizarCarrinho();
}

// 📧 FINALIZAR
function enviarPedido(){

    if(carrinho.length === 0){
        alert("Carrinho vazio!");
        return;
    }

    let msg = "Pedido HamburgueriaZ:\n\n";

    carrinho.forEach(p => {
        msg += `${p.nome} x${p.quantidade}\nExtras: ${p.extras.join(", ")}\nBebida: ${p.bebida}\nR$ ${p.preco}\n\n`;
    });

    window.location.href = `mailto:?subject=Pedido&body=${encodeURIComponent(msg)}`;
}