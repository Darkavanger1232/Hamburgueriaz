package com.example.hamburgueriaz.model;

public class Pedido {

    public String nome;
    public boolean bacon, queijo, onion;
    public int quantidade;
    public int preco;

    public Pedido(String nome, boolean bacon, boolean queijo, boolean onion, int quantidade, int preco){
        this.nome = nome;
        this.bacon = bacon;
        this.queijo = queijo;
        this.onion = onion;
        this.quantidade = quantidade;
        this.preco = preco;
    }
}