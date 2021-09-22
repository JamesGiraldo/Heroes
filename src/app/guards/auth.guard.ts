import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
/** esto es un simple servicio para validar rutas */
export class AuthGuard implements CanActivate {

  constructor( private auth: AuthService, private router: Router ){}

  // CanActivate: Mira si el usuario puede acceder a una página determinada.
  canActivate(): boolean {

    if ( this.auth.estaAutenticado() ) {      
      // retornar ok para que pueda continuar :) 
      return true;
    }else{
      // redireccionar al login 
      this.router.navigateByUrl('/login');
      // y retornar falso en caso tal de que no cumpla la condición 
      return false;
    }

  }
  
}
