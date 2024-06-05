import { Item } from './../item';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  API: string = "http://frontIP/api/itens";
  http = inject(HttpClient);


  constructor() { }


  listAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API);
  }

  deletar(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.API}/deletar/${id}`);
  }

  verify(item: Item): Observable<Item> {
    if (item.id) {
      return this.http.put<Item>(`${this.API}/editar/${item.id}`, item)
        .pipe(
          catchError(error => {
            console.error("Error", error);
            throw error;
          })
        );
    } else {
        return this.http.post<Item>(this.API,item);
    }
  }

}
