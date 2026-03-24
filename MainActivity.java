package com.example.hamburgueriaz;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.*;
import android.content.Intent;
import android.net.Uri;

import com.example.hamburgueriaz.model.Pedido;

public class MainActivity extends AppCompatActivity {

    int quantidade = 1;

    TextView qtd, preco, resumo;
    EditText nome;

    CheckBox bacon, queijo, onion;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        qtd = findViewById(R.id.qtd);
        preco = findViewById(R.id.preco);
        resumo = findViewById(R.id.resumo);
        nome = findViewById(R.id.nome);

        bacon = findViewById(R.id.bacon);
        queijo = findViewById(R.id.queijo);
        onion = findViewById(R.id.onion);

        atualizarPreco();

        // Atualiza preço ao clicar nos adicionais
        CompoundButton.OnCheckedChangeListener listener = (buttonView, isChecked) -> atualizarPreco();

        bacon.setOnCheckedChangeListener(listener);
        queijo.setOnCheckedChangeListener(listener);
        onion.setOnCheckedChangeListener(listener);
    }

    public void somar(View v){
        quantidade++;
        atualizarTela();
    }

    public void subtrair(View v){
        if(quantidade > 1){
            quantidade--;
        }
        atualizarTela();
    }

    private void atualizarTela(){
        qtd.setText(String.valueOf(quantidade));
        atualizarPreco();
    }

    private void atualizarPreco(){
        int base = 20;

        if(bacon.isChecked()) base += 2;
        if(queijo.isChecked()) base += 2;
        if(onion.isChecked()) base += 3;

        int total = base * quantidade;
        preco.setText("R$ " + total);
    }

    public void enviarPedido(View v){

        String nomeCliente = nome.getText().toString();

        if(nomeCliente.isEmpty()){
            Toast.makeText(this, "Digite seu nome!", Toast.LENGTH_SHORT).show();
            return;
        }

        boolean temBacon = bacon.isChecked();
        boolean temQueijo = queijo.isChecked();
        boolean temOnion = onion.isChecked();

        int total = calcularTotal(temBacon, temQueijo, temOnion);

        String mensagem =
                "Nome: " + nomeCliente +
                "\nBacon: " + (temBacon ? "Sim" : "Não") +
                "\nQueijo: " + (temQueijo ? "Sim" : "Não") +
                "\nOnion: " + (temOnion ? "Sim" : "Não") +
                "\nQtd: " + quantidade +
                "\nTotal: R$ " + total;

        resumo.setText(mensagem);

        // 🛒 adiciona ao carrinho
        Pedido pedido = new Pedido(nomeCliente, temBacon, temQueijo, temOnion, quantidade, total);
        CarrinhoActivity.listaPedidos.add(pedido);

        // 📧 email
        Intent intent = new Intent(Intent.ACTION_SENDTO);
        intent.setData(Uri.parse("mailto:"));
        intent.putExtra(Intent.EXTRA_SUBJECT, "Pedido de " + nomeCliente);
        intent.putExtra(Intent.EXTRA_TEXT, mensagem);

        startActivity(intent);
    }

    public void abrirCarrinho(View v){
        startActivity(new Intent(this, CarrinhoActivity.class));
    }

    private int calcularTotal(boolean bacon, boolean queijo, boolean onion){
        int base = 20;

        if(bacon) base += 2;
        if(queijo) base += 2;
        if(onion) base += 3;

        return base * quantidade;
    }
}