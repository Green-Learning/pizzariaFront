import { Sabores } from './../sabores';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/sistema/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SaborService {

  API: string = "http://localhost:8080/api/sabores";
  http = inject(HttpClient);
  loginService = inject(LoginService);

  constructor() { }


  listAll():Observable<Sabores[]>{
    return this.http.get<Sabores[]>(this.API);
  }

  deletar(id : number):Observable<Sabores>{
    const nomeUser = this.loginService.getUsername();
    
    return this.http.delete<Sabores>(`${this.API}/deletar/${id}`, { params: { userExclusao: nomeUser }});
  }

  verify(sabores : Sabores): Observable<Sabores>{
    const nomeUser = this.loginService.getUsername();
    
    if(sabores.id){
      return this.http.put<Sabores>(`${this.API}/editar/${sabores.id}`, { sabores, userAlteracao: nomeUser })
      .pipe(
        catchError(error =>{
          console.error("Error", error);
            throw error;
        })
      );
    }else{
      return this.http.post<Sabores>(this.API, { sabores, userCreacao: nomeUser });
    }
  }

}
