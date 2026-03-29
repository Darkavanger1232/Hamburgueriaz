let carrinho = [];

// 🍔 EXTRAS
const extras = [
    {nome:"Bacon", preco:3},
    {nome:"Queijo", preco:2},
    {nome:"Ovo", preco:2},
    {nome:"Alface", preco:1},
    {nome:"Tomate", preco:1}
];

// 🥤 BEBIDAS ATÉ 3L
const bebidas = [
    {nome:"Coca 1L", preco:8},
    {nome:"Coca 2L", preco:12},
    {nome:"Coca 3L", preco:15},
    {nome:"Guaraná 1L", preco:7},
    {nome:"Guaraná 2L", preco:11},
    {nome:"Guaraná 3L", preco:14}
];

// LOGIN
function login(){
    auth.signInWithEmailAndPassword(
        document.getElementById("email").value,
        document.getElementById("senha").value
    )
    .then(()=>{
        document.getElementById("login").style.display="none";
        document.getElementById("app").style.display="block";
        carregarProdutos();
    })
    .catch(()=> alert("Erro no login"));
}

function logout(){
    auth.signOut();
    location.reload();
}

// 🍔 CARREGAR PRODUTOS FIREBASE
function carregarProdutos(){
    let div = document.getElementById("cardapio");
    div.innerHTML="";

    db.collection("produtos").get().then(snapshot=>{

        snapshot.forEach(doc=>{
            let p = doc.data();

            let extrasHTML = extras.map(e =>
                `<label><input type="checkbox" value="${e.preco}"> ${e.nome}</label><br>`
            ).join("");

            let bebidasHTML = bebidas.map(b =>
                `<option value="${b.preco}">${b.nome}</option>`
            ).join("");

            div.innerHTML += `
            <div class="card">
                <img src="${p.img}" onerror="this.src='https://via.placeholder.com/300'">

                <h3>${p.nome}</h3>
                <p>R$ ${p.preco}</p>

                <div>${extrasHTML}</div>

                <select>
                    <option value="0">Sem bebida</option>
                    ${bebidasHTML}
                </select>

                <button onclick="addCarrinho('${p.nome}', ${p.preco}, this)">
                    Adicionar
                </button>
            </div>
            `;
        });

    });
}

// 🛒 ADD
function addCarrinho(nome, preco, btn){

    let card = btn.parentElement;

    let checks = card.querySelectorAll("input[type=checkbox]");
    let select = card.querySelector("select");

    let total = preco;

    checks.forEach(c=>{
        if(c.checked) total += parseInt(c.value);
    });

    total += parseInt(select.value);

    carrinho.push({nome, preco: total});

    atualizarCarrinho();
}

// 🔄 ATUALIZAR
function atualizarCarrinho(){
    let lista = document.getElementById("listaCarrinho");
    let total = 0;

    lista.innerHTML="";

    carrinho.forEach((p,i)=>{
        total += p.preco;

        lista.innerHTML += `
        <li>
            ${p.nome} - R$ ${p.preco}
            <button onclick="remover(${i})">❌</button>
        </li>`;
    });

    document.getElementById("total").innerText = total;
}

// ❌ REMOVER
function remover(i){
    carrinho.splice(i,1);
    atualizarCarrinho();
}

// 📦 FINALIZAR
function finalizar(){

    let endereco = document.getElementById("endereco").value;
    let telefone = document.getElementById("telefone").value;

    if(!endereco || !telefone){
        alert("Preencha endereço e telefone");
        return;
    }

    let total = carrinho.reduce((t,i)=>t+i.preco,0);
    let tempo = Math.floor(Math.random()*20)+20;

    db.collection("pedidos").add({
        cliente: auth.currentUser.email,
        endereco,
        telefone,
        itens: carrinho,
        total,
        tempo,
        status: "pendente",
        data: new Date()
    })
    .then(()=>{
        alert("Pedido confirmado! Tempo: "+tempo+" minutos");
        carrinho = [];
        atualizarCarrinho();
    });
}
