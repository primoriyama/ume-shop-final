import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICep } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly apiUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<ICep> {
    const cepFormatado = cep.replace(/\D/g, '');
    return this.http.get<ICep>(`${this.apiUrl}/${cepFormatado}/json`);
  }
}
