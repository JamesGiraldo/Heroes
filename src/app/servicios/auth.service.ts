import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyDlOWIGGUqL8mYLGFswsPN5LRZtbXSdKw4';
  userToken: string;

  // crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private http: HttpClient ) {
    this.leerToken();
   }

  logout(){
    localStorage.removeItem('token');
  }
  
  login(usuario: UsuarioModel){
    const authData = {
      // Esto es lo mismo pero recibe todos los campos del usuario incluyendo el nombre
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(
        map( resp => {
        console.log('Entro en el mapa del RXJS');        
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  nuevoUsuario( usuario: UsuarioModel){
    const authData = {
      // Esto es lo mismo pero recibe todos los campos del usuario incluyendo el nombre
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        console.log('Entro en el mapa del RXJS');        
        this.guardarToken( resp['idToken']);
        return resp;
      })
    );
  }

  private guardarToken( idToken: string){
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );
    localStorage.setItem( 'expira', hoy.getTime().toString());
  }

  leerToken(){
    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if ( this.userToken.length < 2){
      return false;
    }

    const expira = Number(localStorage.getItem( 'expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if ( expiraDate > new Date() ){
      return true;
    }else{
      return false;
    }    
  }

}