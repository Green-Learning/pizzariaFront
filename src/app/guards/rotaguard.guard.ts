import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../sistema/login/services/login.service';
import { inject } from '@angular/core';

export const rotaguardGuard: CanActivateFn = (route, state) => {
  
  let loginService = inject(LoginService);
  let roteador = inject(Router);

  if (loginService.getToken() == null) {
    roteador.navigate(['/login']);
    return false;
  } else
    return true;
};
