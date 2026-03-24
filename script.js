let carrinho = [];
let categoriaAtual = "todos";

// CARDÁPIO
const hamburgueres = [
    {
        nome: "Clássico",
        preco: 20,
        categoria: "tradicional",
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
        nome: "Cheddar Bacon",
        preco: 25,
        categoria: "premium",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        nome: "Duplo Smash",
        preco: 30,
        categoria: "premium",
        img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086"
    }
];

// EXTRAS
const extras = [
    { nome: "Bacon", preco: 2 },
    { nome: "Queijo", preco: 2 },
    { nome: "Ovo", preco: 2 }
];

// BEBIDAS
const bebidas = [
    { nome: "Coca 1L", preco: 8 },
    { nome: "Coca 2L", preco: 12 }
];

// RENDER
function carregarCardapio(){
    let div = document.getElementById("cardapio");
    div.innerHTML = "";

    hamburgueres.forEach((h, i) => {

        if(categoriaAtual !== "todos" && h.categoria !== categoriaAtual){
            return;
        }

        let extrasHTML = extras.map(e =>
            `<label><input type="checkbox" value="${e.preco}"> ${e.nome}</label><br>`
        ).join("");

        let bebidasHTML = bebidas.map(b =>
            `<option value="${b.preco}">${b.nome}</option>`
        ).join("");

        div.innerHTML += `
        <div class="card">

            <img src="${h.img}" 
            onerror="this.src='https://via.placeholder.com/300'">

            <h3>${h.nome}</h3>
            <p>R$ ${h.preco}</p>

            ${extrasHTML}

            <select>
                <option value="0">Sem bebida</option>
                ${bebidasHTML}
            </select>

            <div class="qtd">
                <button onclick="diminuir(this)">-</button>
                <span>1</span>
                <button onclick="aumentar(this)">+</button>
            </div>

            <button onclick="addCarrinho(${i}, this)">Adicionar</button>

        </div>
        `;
    });
}

// FILTRO
function filtrar(cat){
    categoriaAtual = cat;
    carregarCardapio();
}

// QTD
function aumentar(btn){
    let s = btn.parentElement.querySelector("span");
    s.innerText++;
}

function diminuir(btn){
    let s = btn.parentElement.querySelector("span");
    if(s.innerText > 1) s.innerText--;
}

// ADD
function addCarrinho(i, btn){
    let card = btn.parentElement;

    let checks = card.querySelectorAll("input");
    let select = card.querySelector("select");
    let qtd = parseInt(card.querySelector("span").innerText);

    let total = hamburgueres[i].preco;

    checks.forEach(c => {
        if(c.checked) total += parseInt(c.value);
    });

    total += parseInt(select.value);
    total *= qtd;

    carrinho.push({
        nome: hamburgueres[i].nome,
        preco: total,
        qtd
    });

    atualizar();
}

// ATUALIZAR
function atualizar(){
    let lista = document.getElementById("carrinhoLista");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((p,i)=>{
        total += p.preco;

        lista.innerHTML += `
        <li>
            ${p.nome} x${p.qtd} - R$ ${p.preco}
            <button onclick="remover(${i})">❌</button>
        </li>`;
    });

    document.getElementById("total").innerText = total;
}

// REMOVER
function remover(i){
    carrinho.splice(i,1);
    atualizar();
}

// FINALIZAR
function finalizar(){
    alert("Pedido enviado!");
}

// INIT
window.onload = carregarCardapio;