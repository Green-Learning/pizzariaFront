import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cadastro } from '../cadastro';

@Injectable({
  providedIn: 'root'
})
export class CadastroServiceService {

  API: string = 'http://192.168.3.23:443/api/user';
  http = inject(HttpClient);

  constructor() { }


  logar(cadastro: Cadastro): Observable<Cadastro> {
    return this.http.post<Cadastro>(this.API, cadastro);
  }
}
