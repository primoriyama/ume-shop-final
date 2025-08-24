import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProduto } from '../../shared/models/produto.model';
import { CarrinhoService } from '../../shared/services/carrinho.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { PrecoComDescontoPipe } from '../../shared/pipes/preco-com-desconto-pipe';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, PrecoComDescontoPipe, RouterModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.scss'
})
export class CarrinhoComponent {
  itensCarrinho$: Observable<IProduto[]>;

  constructor(private carrinhoService: CarrinhoService) {
    this.itensCarrinho$ = this.carrinhoService.itens$;
  }

  removerItem(produtoId: number): void {
    this.carrinhoService.removerProduto(produtoId);
  }

  calcularTotal(itens: IProduto[]): number {
    const precoPipe = new PrecoComDescontoPipe();
    return itens.reduce((total, item) => {
      const precoFinal = precoPipe.transform(item.price, item.discountPercentage);
      return total + precoFinal;
    }, 0);
  }
}
