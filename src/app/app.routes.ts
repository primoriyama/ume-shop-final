import { Routes } from '@angular/router';
import { GaleriaProdutosComponent } from './pages/galeria-produtos/galeria-produtos.component';
import { DetalhesProdutoComponent } from './pages/detalhes-produto/detalhes-produto.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';

export const routes: Routes = [
   { path: '', component: GaleriaProdutosComponent },
   { path: 'produto/:id', component: DetalhesProdutoComponent },
   { path: 'carrinho', component: CarrinhoComponent },
   { path: 'checkout', component: CheckoutComponent }
];
