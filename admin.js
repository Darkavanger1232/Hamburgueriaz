<h2>Admin</h2>
<ul id="listaAdmin"></ul>

<script src="js/firebase.js"></script>

<script>
db.collection("pedidos").onSnapshot(snap=>{

    listaAdmin.innerHTML = "";

    snap.forEach(doc=>{

        let p = doc.data();

        listaAdmin.innerHTML += `
        <li>
        ${p.nomeCliente} - R$ ${p.total}
        <button onclick="update('${doc.id}',2)">Preparando</button>
        <button onclick="update('${doc.id}',3)">Entrega</button>
        <button onclick="update('${doc.id}',4)">Finalizar</button>
        </li>`;
    });

});

function update(id, etapa){

    db.collection("pedidos").doc(id).update({
        etapa: etapa
    });

}
</script>
