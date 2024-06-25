import { Usuario } from './../usuario';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API: string = 'http://localhost:8080/api/usuario';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  deletar(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.API}/deletar/${id}`);
  }


  verify(usuario: Usuario): Observable<Usuario> {
    if (usuario.id) {
    return this.http.put<Usuario>(`${this.API}/editar/${usuario.id}`, usuario)
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {
      return this.http.post<Usuario>(this.API, usuario);
    }

  }
}
