import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Audit } from '../audit';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  API: string = 'https://172.31.94.174/api/auditoria'
  http = inject(HttpClient);

  constructor() { }

  listar(): Observable<Audit[]> {
    return this.http.get<Audit[]>(`${this.API}` + "/lista");
  }
}
