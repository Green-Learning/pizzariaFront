// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-index',
//   templateUrl: './index.component.html',
//   styleUrls: ['./index.component.scss']
// })
// export class IndexComponent {

// }

import { Component, inject } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { LoginService } from 'src/app/sistema/login/services/login.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  loginService = inject(LoginService);
  username!: string;
  isLogged!: boolean;
  isAdmin!: boolean;

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  //ip do haproxy - keycloack
  authConfig: AuthConfig = {
    issuer: 'https://54.167.145.183:8443/realms/GreenLearning',
    requireHttps: false,
    redirectUri: window.location.origin,
    clientId: 'greenlearning-frontend',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.getIdentityClaims()) {
          this.isLogged = this.loginService.getIsLogged();
          this.isAdmin = this.loginService.getIsAdmin();
          this.username = this.loginService.getUsername();
        }
      });
  }

}