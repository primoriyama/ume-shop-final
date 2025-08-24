import { Component, Input } from '@angular/core';
import { IProduto } from '../../models/produto.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResumirTextoPipe } from '../../pipes/resumir-texto-pipe';
import { PrecoComDescontoPipe } from '../../pipes/preco-com-desconto-pipe';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule, RouterModule, ResumirTextoPipe, PrecoComDescontoPipe],
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.scss'
})
export class CardProdutoComponent {
  @Input() produto!: IProduto;
}
