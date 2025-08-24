import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProduto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private itensNoCarrinho = new BehaviorSubject<IProduto[]>([]);

  itens$ = this.itensNoCarrinho.asObservable();

  constructor() { }

  adicionarProduto(produto: IProduto) {
    const carrinhoAtual = this.itensNoCarrinho.getValue();

    const novoCarrinho = [...carrinhoAtual, produto];

    this.itensNoCarrinho.next(novoCarrinho);
    console.log('Carrinho atualizado!', novoCarrinho);
  }

  getItens(): IProduto[] {
    return this.itensNoCarrinho.getValue();
  }

  removerProduto(produtoId: number) {
  const carrinhoAtual = this.itensNoCarrinho.getValue();

  const novoCarrinho = carrinhoAtual.filter(item => item.id !== produtoId);

  this.itensNoCarrinho.next(novoCarrinho);
  console.log('Carrinho atualizado após remoção!', novoCarrinho);
}
}
