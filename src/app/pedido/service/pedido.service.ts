import { Pedido } from './../pedido';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { LoginService } from 'src/app/sistema/login/services/login.service';


import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  API: string = 'https://172.31.94.174/api/pedido'
  http = inject(HttpClient);
  loginService = inject(LoginService); 

  constructor() { }

  listAll(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.API);
  }

  edit(pedido: Pedido): Observable<Pedido> {
    const nomeUser = this.loginService.getUsername();
    return this.http.put<Pedido>(`${this.API}/editar/${pedido.id}`, { pedido, userAlteracao: nomeUser })
      .pipe(
        catchError(error => {
          console.error("Error", error);
          throw error;
        })
      );
  }

  save(pedido: Pedido): Observable<Pedido> {
    const nomeUser = this.loginService.getUsername();
    return this.http.post<Pedido>(this.API, { pedido, userCreacao: nomeUser });

  }

  deletar(id: number): Observable<string> {
    const nomeUser = this.loginService.getUsername();
    return this.http.delete<string>(`${this.API}/deletar/${id}`, { params: { userExclusao: nomeUser } });

  }

  verify(pedido: Pedido): Observable<Pedido> {
    const nomeUser = this.loginService.getUsername();
    if (pedido.id) {
      console.log('a ');
      console.log(pedido);
      return this.http.put<Pedido>(`${this.API}/editar/${pedido.id}`, { pedido, userAlteracao: nomeUser })
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {

      console.log('b ');
      console.log(pedido);
      return this.http.post<Pedido>(this.API, { pedido, userCreacao: nomeUser });

    }

  }
}
