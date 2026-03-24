public class CarrinhoActivity extends AppCompatActivity {

    static ArrayList<Pedido> listaPedidos = new ArrayList<>();

    ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_carrinho);

        listView = findViewById(R.id.lista);

        ArrayAdapter<String> adapter = new ArrayAdapter<>(
                this,
                android.R.layout.simple_list_item_1,
                gerarLista()
        );

        listView.setAdapter(adapter);
    }

    private ArrayList<String> gerarLista(){

        ArrayList<String> lista = new ArrayList<>();

        for(Pedido p : listaPedidos){
            lista.add(p.nome + " - R$ " + p.preco);
        }

        return lista;
    }
}