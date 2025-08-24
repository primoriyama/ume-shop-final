import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategoria, IProduto, IRespostaApi } from '../models/produto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly apiUrl = 'https://dummyjson.com/products';
   private categoriaSelecionada = new BehaviorSubject<string>('all');
  categoriaSelecionada$ = this.categoriaSelecionada.asObservable();

  constructor(private http: HttpClient) { }

  buscarTodosOsProdutos(): Observable<IRespostaApi> {
    const url = `${this.apiUrl}?limit=100`;
    return this.http.get<IRespostaApi>(url);
  }

  getProdutoPorId(id: number): Observable<IProduto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IProduto>(url);
  }

getCategorias(): Observable<ICategoria[]> {
  const url = `${this.apiUrl}/categories`;
  return this.http.get<ICategoria[]>(url);
}

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada.next(categoria);
  }
}


