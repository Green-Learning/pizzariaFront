// import { Injectable, inject } from '@angular/core';
// import { Login } from '../login';
// import { Observable } from 'rxjs';
// import { User } from '../user';
// import { HttpClient } from '@angular/common/http';
// import { jwtDecode, JwtPayload } from "jwt-decode";

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   API: string = 'http://localhost:8080/api/login';
//   http = inject(HttpClient);

//   constructor() { }


//   logar(login: Login): Observable<User> {
//     return this.http.post<User>(this.API, login);
//   }

//   deslogar(): Observable<any> {
//     return this.http.get<any>(this.API + '/deslogar');
//   }


//   addToken(token: string) {
//     localStorage.setItem('token', token);
//   }

//   removerToken() {
//     localStorage.removeItem('token');
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }


//   jwtDecode() {
//     let token = this.getToken();
//     if (token) {
//       return jwtDecode<JwtPayload>(token);
//     }
//     return "";
//   }

//   hasPermission(role: string) {
//     let user = this.jwtDecode() as User;
//     if (user.role == role)
//       return true;
//     else
//       return false;
//   }
// }


import { Injectable, inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private oauthService: OAuthService, private router: Router){}

  public login(): void {
    this.oauthService.initImplicitFlowInternal();
    this.router.navigate(['/pedidos']);
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  public getUsername(): string {
    return this.oauthService.getIdentityClaims()[`preferred_username`];
  }

  public getIsLogged(): boolean {
    return (this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken());
  }

  public getIsAdmin(): boolean {
    const token = this.oauthService.getAccessToken();
    const payload = token.split('.')[1];
    const payloadDecodedJson = atob(payload);
    const payloadDecoded = JSON.parse(payloadDecodedJson);
     console.log(payloadDecoded);
    return payloadDecoded.realm_access.roles.indexOf('realm-admin') !== -1;
  }

  }