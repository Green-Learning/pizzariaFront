import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit } from '../audit';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  API: string = 'https://18.209.148.183/api/auditoria'
  http = inject(HttpClient);

  constructor() { }

  listar(): Observable<Audit[]> {
    return this.http.get<Audit[]>(`${this.API}` + "/lista");
  }
}
