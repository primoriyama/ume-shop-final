// Caminho: src/app/pages/galeria-produtos/galeria-produtos.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';

// CORRIGIDO AQUI: Importe o nome completo e correto da classe
import { GaleriaProdutosComponent } from './galeria-produtos.component';

// CORRIGIDO AQUI: Use o nome correto no describe
describe('GaleriaProdutosComponent', () => {
  // CORRIGIDO AQUI: Use o nome correto nas declarações de variáveis
  let component: GaleriaProdutosComponent;
  let fixture: ComponentFixture<GaleriaProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // CORRIGIDO AQUI: Use o nome correto nos imports do teste
      imports: [GaleriaProdutosComponent]
    })
    .compileComponents();

    // CORRIGIDO AQUI: Use o nome correto para criar o componente
    fixture = TestBed.createComponent(GaleriaProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
