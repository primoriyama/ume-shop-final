import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IProduto } from '../../shared/models/produto.model';
import { ActivatedRoute } from '@angular/router';
import { ProdutoService } from '../../shared/services/produto.service';
import { CarrinhoService } from '../../shared/services/carrinho.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detalhes-produto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-produto.component.html',
  styleUrl: './detalhes-produto.component.scss'
})
export class DetalhesProdutoComponent implements OnInit {

  produto?: IProduto;
  carregando = true;

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];

    this.produtoService.getProdutoPorId(id).subscribe({
      next: (resultado) => {
        this.produto = resultado;
        this.carregando = false;
      },
      error: (erro) => {
        console.error("Erro ao buscar detalhes do produto!", erro);
        this.carregando = false;
      }
    });
  }
  adicionarAoCarrinho() {
    if (this.produto) {
      this.carrinhoService.adicionarProduto(this.produto);
      this.toastr.success(`${this.produto.title} foi adicionado ao carrinho!`, 'Sucesso!');
    }
  }
}
