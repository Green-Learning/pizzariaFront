import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro } from '../cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  API: string = 'https://18.209.148.183/api/user';
  http = inject(HttpClient);

  constructor() { }


  logar(cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(this.API, cadastro);
  }
}
