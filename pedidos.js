function finalizarPedido(){

    if(carrinho.length === 0){
        alert("Carrinho vazio");
        return;
    }

    let total = carrinho.reduce((t,i)=>t+i.preco,0);

    db.collection("pedidos").add({
        userId: userAtual.uid,
        nomeCliente: userAtual.email,
        itens: carrinho,
        total,
        endereco: endereco.value,
        telefone: telefone.value,
        pagamento: pagamento.value,
        status:"Recebido",
        etapa:1,
        criadoEm:new Date()
    })
    .then(doc=>{

        alert("Pedido confirmado! Tempo: 30-50min");

        window.location.href = "rastreamento.html?id="+doc.id;

    });
}
