import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traduzir',
  standalone: true
})
export class TraduzirPipe implements PipeTransform {

  private traducoes: { [key: string]: string } = {
    'beauty': 'Beleza',
    'smartphones': 'Celulares',
    'laptops': 'Notebooks',
    'fragrances': 'Perfumes',
    'skin-care': 'Cuidados com a Pele',
    'groceries': 'Mercearia',
    'home-decoration': 'Decoração',
    'kitchen-accessories': 'Acessórios de Cozinha',
    'mobile-accessories': 'Acessórios para Celulares',
    'sports-accessories': 'Acessórios para Esportes',
    'furniture': 'Móveis',
    'tops': 'Roupas (Tops)',
    'vehicle': 'Acessórios para Veículos',
    'womens-dresses': 'Vestidos',
    'womens-shoes': 'Sapatos Femininos',
    'mens-shirts': 'Camisas Masculinas',
    'mens-shoes': 'Sapatos Masculinos',
    'mens-watches': 'Relógios Masculinos',
    'womens-watches': 'Relógios Femininos',
    'womens-bags': 'Bolsas',
    'womens-jewellery': 'Joias',
    'sunglasses': 'Óculos de Sol',
    'automotive': 'Automotivo',
    'motorcycle': 'Acessórios para motos',
    'lighting': 'Iluminação'
  };

  transform(value: string | undefined | null): string {
    if (!value) {
      return '';
    }
    return this.traducoes[value] || value;
  }
}



