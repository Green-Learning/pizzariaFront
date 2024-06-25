import { Item } from './../item';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { LoginService } from 'src/app/sistema/login/services/login.service';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API: string = "http://localhost:8080/api/itens";
  http = inject(HttpClient);
  loginService = inject(LoginService);


  constructor() { }


  listAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API);
  }

  deletar(id: number): Observable<Item> {
    const nomeUser = this.loginService.getUsername();
    return this.http.delete<Item>(`${this.API}/deletar/${id}`, { params: { userExclusao: nomeUser } });
  }

  verify(item: Item): Observable<Item> {
    const nomeUser = this.loginService.getUsername();
    if (item.id) {
      return this.http.put<Item>(`${this.API}/editar/${item.id}`, { item, userAlteracao: nomeUser })
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {
        return this.http.post<Item>(this.API, { item, userCreacao: nomeUser });
    }
  }

}
