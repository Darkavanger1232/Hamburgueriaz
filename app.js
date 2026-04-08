let userAtual = null;

auth.onAuthStateChanged(user => {

    if(!user){
        window.location.href = "index.html";
    } else {
        userAtual = user;
        carregarCardapio();
    }

});

function carregarCardapio(){

    const produtos = [
        {nome:"Clássico", preco:20},
        {nome:"Bacon", preco:25},
        {nome:"Duplo", preco:30}
    ];

    cardapio.innerHTML = "";

    produtos.forEach(p => {

        cardapio.innerHTML += `
        <div class="card">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco}</p>
            <button onclick="add('${p.nome}',${p.preco})" class="btn">
            Adicionar
            </button>
        </div>
        `;
    });
}
