import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Funcionario } from '../funcionario';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  API: string = 'http://localhost:8080/api/funcionario';
  http = inject(HttpClient);

  constructor() { }

  list(): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(this.API);
  }

  deletar(id: number): Observable<Funcionario>{
    return this.http.delete<Funcionario>(`${this.API}/deletar/${id}`);
  }

  verify(funcionario: Funcionario): Observable<Funcionario>{
    if(funcionario.id){
      return this.http.put<Funcionario>(`${this.API}/editar/${funcionario.id}`, funcionario)
      .pipe(
        catchError(error => {
          console.log("Error", error);
          throw error;
        })
      );

    }else{
      return this.http.post<Funcionario>(this.API, funcionario);
    }
  }
}
