let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// 🍔 DADOS
const hamburgueres = [
    { nome: "Clássico", preco: 20, categoria: "tradicional", img: "https://i.imgur.com/8bKQ8xE.png" },
    { nome: "Cheddar Bacon", preco: 25, categoria: "premium", img: "https://i.imgur.com/0umadnY.png" },
    { nome: "Duplo Smash", preco: 30, categoria: "premium", img: "https://i.imgur.com/2DhmtJ4.png" },
    { nome: "Vegano", preco: 22, categoria: "vegano", img: "https://i.imgur.com/N5uCbDu.png" }
];

// CARREGAR
window.onload = () => {
    renderizar(hamburgueres);
    atualizarCarrinho();
};

// FILTRO
function filtrar(cat){
    if(cat === "todos") return renderizar(hamburgueres);

    let filtrados = hamburgueres.filter(h => h.categoria === cat);
    renderizar(filtrados);
}

// RENDER
function renderizar(lista){
    let div = document.getElementById("cardapio");
    div.innerHTML = "";

    lista.forEach((h, i) => {
        div.innerHTML += `
        <div class="card">
            <img src="${h.img}">
            <h3>${h.nome}</h3>
            <p>R$ ${h.preco}</p>
            <button onclick="add(${i})">Adicionar</button>
        </div>
        `;
    });
}

// ADD
function add(index){
    let item = hamburgueres[index];

    carrinho.push(item);
    salvar();
}

// SALVAR
function salvar(){
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
}

// ATUALIZAR
function atualizarCarrinho(){
    let lista = document.getElementById("carrinho");
    let total = 0;

    lista.innerHTML = "";

    carrinho.forEach((item, i) => {
        total += item.preco;

        lista.innerHTML += `
        <li>
            ${item.nome} - R$ ${item.preco}
            <button onclick="remover(${i})">❌</button>
        </li>
        `;
    });

    document.getElementById("total").innerText = total;
}

// REMOVER
function remover(i){
    carrinho.splice(i, 1);
    salvar();
}

// FINALIZAR
function finalizar(){
    if(carrinho.length === 0){
        alert("Carrinho vazio!");
        return;
    }

    let msg = "Pedido:\n";

    carrinho.forEach(p => {
        msg += `${p.nome} - R$ ${p.preco}\n`;
    });

    window.location.href = `mailto:?subject=Pedido&body=${encodeURIComponent(msg)}`;
}