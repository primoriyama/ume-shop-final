import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IProduto } from '../../shared/models/produto.model';
import { ProdutoService } from '../../shared/services/produto.service';
import { CommonModule } from '@angular/common';
import { CardProdutoComponent } from '../../shared/components/card-produto/card-produto.component';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-galeria-produtos',
  standalone: true,
  imports: [CommonModule, CardProdutoComponent, ReactiveFormsModule],
  templateUrl: './galeria-produtos.component.html', 
  styleUrl: './galeria-produtos.component.scss'
})
export class GaleriaProdutosComponent implements OnInit {

  private listaCompleta: IProduto[] = [];
  listaFiltrada: IProduto[] = [];
  listaPaginada: IProduto[] = [];
  carregando: boolean = true;
  campoBusca = new FormControl('');

  paginaAtual = 1;
  itensPorPagina = 12;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.buscarTodosOsProdutos().pipe(
      switchMap(resposta => {
        this.listaCompleta = resposta.products;
        this.carregando = false;

        return combineLatest([
          this.produtoService.categoriaSelecionada$,
          this.campoBusca.valueChanges.pipe(
            startWith('')
          )
        ]);
      })
    ).subscribe(([categoria, termoDigitado]) => {
      const termoBusca = termoDigitado?.toLowerCase() || '';
      let produtosFiltrados = this.listaCompleta;

      if (categoria && categoria !== 'all') {
        produtosFiltrados = produtosFiltrados.filter(p => p.category === categoria);
      }

      if (termoBusca) {
        produtosFiltrados = produtosFiltrados.filter(p =>
          p.title.toLowerCase().includes(termoBusca)
        );
      }

      this.listaFiltrada = produtosFiltrados;
      this.paginaAtual = 1;
      this.atualizarPagina();
    });
  }


  atualizarPagina(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.listaPaginada = this.listaFiltrada.slice(inicio, fim);
  }

  irParaPagina(pagina: number): void {
    this.paginaAtual = pagina;
    this.atualizarPagina();
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPagina();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPagina();
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.listaFiltrada.length / this.itensPorPagina);
  }

  get paginasDisponiveis(): (number | string)[] {
    const totalPaginas = this.totalPaginas;
    const paginaAtual = this.paginaAtual;
    const paginas: (number | string)[] = [];

    if (totalPaginas <= 7) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      paginas.push(1);
      if (paginaAtual > 4) {
        paginas.push('...');
      }
      const inicio = Math.max(2, paginaAtual - 2);
      const fim = Math.min(totalPaginas - 1, paginaAtual + 2);
      for (let i = inicio; i <= fim; i++) {
        paginas.push(i);
      }
      if (paginaAtual < totalPaginas - 3) {
        paginas.push('...');
      }
      paginas.push(totalPaginas);
    }
    return paginas;
  }
}
