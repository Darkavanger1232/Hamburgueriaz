public class LoginActivity extends AppCompatActivity {

    EditText email, senha;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        email = findViewById(R.id.email);
        senha = findViewById(R.id.senha);
    }

    public void login(View v){

        String e = email.getText().toString();
        String s = senha.getText().toString();

        if(e.equals("admin") && s.equals("123")){
            startActivity(new Intent(this, MainActivity.class));
        } else {
            Toast.makeText(this, "Login inválido", Toast.LENGTH_SHORT).show();
        }
    }
}