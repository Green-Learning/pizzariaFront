import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';
import { Login } from '../login';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API: string = 'https://localhost:443/api/login';
  http = inject(HttpClient);
  router = inject(Router);

  constructor() {}

  logar(login: Login): Observable<User> {
    return this.http.post<User>(this.API, login);
  }

  deslogar(): void {
    localStorage.removeItem('token');
    this.removeCookie('token');
    this.router.navigate(['/login']);
  }

  addToken(token: string) {
    localStorage.setItem('token', token);
    this.setCookie('token', token, 1); // Expires in 1 day
  }

  removerToken() {
    localStorage.removeItem('token');
    this.removeCookie('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token') || this.getCookie('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return null;
  }

  hasPermission(role: string): boolean {
    let user = this.jwtDecode() as User;
    return user?.role === role;
  }

  // Cookie methods
  setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  removeCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
}
