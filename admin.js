function loginAdmin(){

    auth.signInWithEmailAndPassword(email.value, senha.value)
    .then(user=>{

        if(user.user.email !== "SEUEMAIL@ADMIN.COM"){
            alert("Acesso negado");
            return;
        }

        document.getElementById("painel").style.display="block";
        carregar();
    });
}

function addProduto(){
    db.collection("produtos").add({
        nome: nome.value,
        preco: parseFloat(preco.value),
        img: img.value
    });
    carregar();
}

function carregar(){
    let lista = document.getElementById("lista");
    lista.innerHTML="";

    db.collection("produtos").get().then(snap=>{
        snap.forEach(doc=>{
            let p = doc.data();

            lista.innerHTML += `
            <li>
                ${p.nome} - R$ ${p.preco}
                <button onclick="remover('${doc.id}')">❌</button>
            </li>`;
        });
    });
}

function remover(id){
    db.collection("produtos").doc(id).delete();
    carregar();
}
