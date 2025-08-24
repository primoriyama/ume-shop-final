import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precoComDesconto',
  standalone: true
})
export class PrecoComDescontoPipe implements PipeTransform {

  transform(preco: number, desconto: number): number {
    if (!preco || !desconto) {
      return preco;
    }

    const valorDoDesconto = (preco * desconto) / 100;
    return preco - valorDoDesconto;
  }
}
