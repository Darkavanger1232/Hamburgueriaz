let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

// 🍔 HAMBURGUERES
const hamburgueres = [
    { nome: "Clássico", preco: 20, categoria: "tradicional", img: "https://i.imgur.com/8bKQ8xE.png" },
    { nome: "Cheddar Bacon", preco: 25, categoria: "premium", img: "https://i.imgur.com/0umadnY.png" },
    { nome: "Duplo Smash", preco: 30, categoria: "premium", img: "https://i.imgur.com/2DhmtJ4.png" },
    { nome: "Vegano", preco: 22, categoria: "vegano", img: "https://i.imgur.com/N5uCbDu.png" }
];

// ➕ ADICIONAIS
const adicionais = [
    { nome: "Bife Extra", preco: 5 },
    { nome: "Alface", preco: 1 },
    { nome: "Tomate", preco: 1 },
    { nome: "Ovo", preco: 2 },
    { nome: "Cebola", preco: 1 },
    { nome: "Queijo", preco: 2 },
    { nome: "Ketchup", preco: 1 },
    { nome: "Mostarda", preco: 1 },
    { nome: "Maionese", preco: 1 },
    { nome: "Barbecue", preco: 2 }
];

// 🥤 BEBIDAS
const bebidas = [
    { nome: "Coca-Cola", tamanhos: { "1L": 8, "2L": 12, "3L": 15 } },
    { nome: "Guaraná", tamanhos: { "1L": 7, "2L": 11, "3L": 14 } },
    { nome: "Fanta", tamanhos: { "1L": 7, "2L": 11, "3L": 14 } }
];

// INIT
window.onload = () => {
    renderizar(hamburgueres);
    atualizarCarrinho();
};

// FILTRO
function filtrar(cat){
    if(cat === "todos") return renderizar(hamburgueres);
    renderizar(hamburgueres.filter(h => h.categoria === cat));
}

// RENDER
function renderizar(lista){
    let div = document.getElementById("cardapio");
    div.innerHTML = "";

    lista.forEach((h, index) => {

        let extrasHTML = adicionais.map(a =>
            `<label><input type="checkbox" value="${a.preco}"> ${a.nome} (+${a.preco})</label>`
        ).join("<br>");

        let bebidasHTML = bebidas.map(b =>
            Object.entries(b.tamanhos)
                .map(([tam, preco]) =>
                    `<option value="${preco}">${b.nome} ${tam} (+${preco})</option>`
                ).join("")
        ).join("");

        div.innerHTML += `
        <div class="card">
            <img src="${h.img}">
            <h3>${h.nome}</h3>
            <p>R$ ${h.preco}</p>

            <div class="extras">
                <strong>Extras:</strong><br>
                ${extrasHTML}
            </div>

            <div class="bebida">
                <strong>Bebida:</strong>
                <select>
                    <option value="0">Nenhuma</option>
                    ${bebidasHTML}
                </select>
            </div>

            <button onclick="add(${index}, this)">Adicionar</button>
        </div>
        `;
    });
}

// ADD
function add(index, btn){
    let card = btn.parentElement;
    let checks = card.querySelectorAll("input[type=checkbox]");
    let select = card.querySelector("select");

    let total = hamburgueres[index].preco;
    let extrasSelecionados = [];

    checks.forEach(c => {
        if(c.checked){
            total += parseInt(c.value);
            extrasSelecionados.push(c.parentElement.innerText);
        }
    });

    let bebida = select.options[select.selectedIndex].text;
    let precoBebida = parseInt(select.value);

    if(precoBebida > 0) total += precoBebida;

    carrinho.push({
        nome: hamburgueres[index].nome,
        extras: extrasSelecionados,
        bebida: precoBebida > 0 ? bebida : "Sem bebida",
        preco: total
    });

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
            <strong>${item.nome}</strong><br>
            Extras: ${item.extras.join(", ") || "Nenhum"}<br>
            Bebida: ${item.bebida}<br>
            R$ ${item.preco}
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

    let msg = "Pedido HamburgueriaZ:\n\n";

    carrinho.forEach(p => {
        msg += `${p.nome}\nExtras: ${p.extras.join(", ") || "Nenhum"}\nBebida: ${p.bebida}\nPreço: R$ ${p.preco}\n\n`;
    });

    window.location.href = `mailto:?subject=Pedido&body=${encodeURIComponent(msg)}`;
}