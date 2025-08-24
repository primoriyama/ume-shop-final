import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarrinhoService } from '../../services/carrinho.service';
import { ProdutoService } from '../../services/produto.service';
import { ICategoria } from '../../models/produto.model';
import { TraduzirPipe } from '../../pipes/traduzir.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, TraduzirPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  quantidadeItens$: Observable<number>;
  categorias: ICategoria[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService
  ) {
    this.quantidadeItens$ = this.carrinhoService.itens$.pipe(
      map(itens => itens.length)
    );
  }

  ngOnInit(): void {
    this.produtoService.getCategorias().subscribe(listaCategorias => {
      this.categorias = listaCategorias;
    });
  }

  onSelecionarCategoria(categoriaSlug: string): void {
    this.produtoService.selecionarCategoria(categoriaSlug);
  }
}




