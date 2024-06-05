import { Pedido } from './../pedido';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API: string = 'http://frontIP/api/pedido'
  http = inject(HttpClient);

  constructor() { }

  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  edit(pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.API}/editar/${pedido.id}`, pedido)
      .pipe(
        catchError(error => {
          console.error("Error", error);
          throw error;
        })
      );
  }

  save(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.API, pedido);
  }

  deletar(id: number): Observable<string> {
    return this.http.delete<string>(`${this.API}/deletar/${id}`);
  }

  verify(pedido: Pedido): Observable<Pedido> {
    if (pedido.id) {
      console.log('a ');
      console.log(pedido);
      return this.http.put<Pedido>(`${this.API}/editar/${pedido.id}`, pedido)
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {

      console.log('b ');
      console.log(pedido);
      return this.http.post<Pedido>(this.API, pedido);
    }

  }
}
