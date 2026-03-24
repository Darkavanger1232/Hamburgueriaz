let carrinho = [];
let categoriaAtual = "todos";

// 🍔 CARDÁPIO
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
    },
    {
        nome: "Vegano",
        preco: 22,
        categoria: "vegano",
        img: "https://images.unsplash.com/photo-1544025162-d76694265947"
    }
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

// 🍔 RENDER
function carregarCardapio(){
    let div = document.getElementById("cardapio");
    div.innerHTML = "";

    hamburgueres.forEach((h, index) => {

        if(categoriaAtual !== "todos" && h.categoria !== categoriaAtual){
            return;
        }

        div.innerHTML += `
        <div class="card">

            <img src="${h.img}?w=400"
            onerror="this.src='https://via.placeholder.com/400x250?text=Hamburguer'">

            <h3>${h.nome}</h3>
            <p><strong>R$ ${h.preco}</strong></p>

            <button onclick="addCarrinho(${index})">
                Adicionar
            </button>

        </div>
        `;
    });
}

// 🔎 FILTRO
function filtrar(cat){
    categoriaAtual = cat;
    carregarCardapio();
}

// 🛒 ADD
function addCarrinho(index){

    carrinho.push({
        nome: hamburgueres[index].nome,
        preco: hamburgueres[index].preco
    });

    atualizarCarrinho();
}

// 🔄 ATUALIZA
function atualizarCarrinho(){
    let lista = document.getElementById("carrinho");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((p, i) => {

        total += p.preco;

        lista.innerHTML += `
        <li>
            ${p.nome} - R$ ${p.preco}
            <button onclick="remover(${i})">❌</button>
        </li>
        `;
    });

    document.getElementById("totalFinal").innerText = total;
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
        msg += `${p.nome} - R$ ${p.preco}\n`;
    });

    window.location.href = `mailto:?subject=Pedido&body=${encodeURIComponent(msg)}`;
}

// INIT
window.onload = carregarCardapio;