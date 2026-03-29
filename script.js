// MENU
function toggleMenu(){
    document.getElementById("menuLateral").classList.toggle("ativo");
}

// LOGOUT
function logout(){
    auth.signOut();
    location.reload();
}

// PRODUTOS EXEMPLO (ou Firebase)
const produtos = [
    {
        nome: "Clássico Z",
        desc: "Alface, tomate, molho especial",
        preco: 20,
        img: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
        nome: "Bacon Supreme",
        desc: "Bacon crocante + cheddar",
        preco: 22,
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
        nome: "Quatro Queijos",
        desc: "Blend de queijos",
        preco: 22,
        img: "https://images.unsplash.com/photo-1585238342024-78d387f4a707"
    }
];

// RENDER
function carregar(){

    let lista = document.getElementById("listaProdutos");
    lista.innerHTML = "";

    produtos.forEach(p=>{

        lista.innerHTML += `
        <div class="card">

            <img src="${p.img}">

            <div class="info">
                <h4>${p.nome}</h4>
                <p>${p.desc}</p>
                <span class="preco">R$ ${p.preco}</span>
            </div>

            <button class="add" onclick="add('${p.nome}', ${p.preco})">+</button>

        </div>
        `;
    });
}

// CARRINHO
let carrinho = [];

function add(nome, preco){
    carrinho.push({nome, preco});
    alert(nome + " adicionado!");
}

// INIT
carregar();
