import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private api_key = 'AIzaSyARUIm9tKfEmUfykbamybibAC9vwH7RlJA';

  /** nueva propiedad para especificar el token del usuario */
  public userToken: string;

  /**  crear nuevo usuario */
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  /** inicar sesión */
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { 

    // así sabremos cada ves que se inicialice el servicio si el token existe
    this.leerToken();
  }

  /** metodo para cerrar sesión */
  logout() {

    // solo borrar el token del localStorage y listo
    localStorage.removeItem('token');

  }

  /** metodo de login */
  login(usuario: UsuarioModel) {
    try {
      /** infromación que hay que mandar en la petición para registrar un usuario. */
      const authData = {
        // email: usuario.email,
        // password: usuario.password,
        /** por medio del operador spread quiere decir que va tener todas las propiedades que recibe de usuario */
        ...usuario,
        returnSecureToken: true
      };

      // mandar una petición post de toda la url seguido de la key junto el cuerpo que recibe la petición
      return this.http.post(`${this.url}:signInWithPassword?key=${this.api_key}`, authData)
       // esto me permite obtener la respuesta cuadno si aplique la petición presente
       .pipe(
        // transforma la información de manera que prefiera recibirla 
        // ventaja es que si la petición genera error nunca netraria en el map 
        map( resp => {
          /** aquí recibimos lo de la respuesta y solo quiero el idToken de esa petición del servicio  */
          this.guradarToken( resp['idToken'] );
          // para que no bloque la respuesta devemos retornarla nuevamente la resp
          return resp;
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  /** metodo de registro  */
  nuevoUsuario(usuario: UsuarioModel) {

    try {
      /** infromación que hay que mandar en la petición para registrar un usuario. */
      const authData = {
        // email: usuario.email,
        // password: usuario.password,
        /** por medio del operador spread quiere decir que va tener todas las propiedades que recibe de usuario */
        ...usuario,
        returnSecureToken: true
      };

      // mandar una petición post de toda la url seguido de la key junto el cuerpo que recibe la petición
      return this.http.post(`${this.url}:signUp?key=${this.api_key}`, authData)
      // esto me permite obtener la respuesta cuadno si aplique la petición presente
      .pipe(
        // transforma la información de manera que prefiera recibirla 
        // ventaja es que si la petición genera error nunca netraria en el map 
        map( resp => {
          /** aquí recibimos lo de la respuesta y solo quiero el idToken de esa petición del servicio  */
          this.guradarToken( resp['idToken'] );
          // para que no bloque la respuesta devemos retornarla nuevamente la resp
          return resp;
        })
      );
    } catch (error) {
      console.log(error);
    }

  }

  /** guardar el token del usuario en el localStorage */
  private guradarToken( idToken: string ) {
    
    /** va ser igual al argumento que recibe este metodo */
    this.userToken = idToken;
    /** llamo el localstorage para alojar ese token que recibimos */
    localStorage.setItem( 'token', idToken );

    // validar la expiración del token que nos da firebase
    /** contine la fecha actual de mis sistema */
    let hoy = new Date();
    // convertimos la fecha en el tiempo que nos da el campo de firebase de expiración e token 
    hoy.setSeconds( 3600 );
    // guardamos el tiempo de expiración convertido a string
    localStorage.setItem( 'expira', hoy.getTime().toString() );


  }

  /** leer el token :)  */
  leerToken(){

    /** validar si existe infromación referente a token alojada */
    if ( localStorage.getItem('token') ) {
      // si es así pues se le asigna el mismo token alojado :) 
      this.userToken = localStorage.getItem('token')
    } else {
      // dejarlo vacio ya que no aplica 
      this.userToken = '';
    }

    /** si quisieramos retornar el token del usuario presente en caso tal de que este.  */
    return this.userToken;
  }

  /** verifiar la utentificación del usuario en el sistema por medio del token  */
  estaAutenticado(): boolean{

    // validamos si no recibimos el token
    if ( this.userToken.length < 2 ) {
      // que no haga nada
      return false;
    }
    // tomar el valor del token transformado en numero 
    const expira = Number(localStorage.getItem('expira'));

    // nueva variable que tome la fecha actual
    const expiraDate = new Date();
    // convertimos la fecha en el tiempo que almacenamos en el localStorage
    expiraDate.setTime( expira );

    // validamos si el valor de la fecha expirada es mayor que la fecha actual.
    if ( expiraDate > new Date() ){
      return true;
    }else{
      return false;
    }


    // regresar la cantidad de valores que tiene el token del usuario
    return this.userToken.length > 2;

  }


}
