import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../../servicios/auth.service';
import { UsuarioModel } from '../../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit(): void {
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login( form: NgForm ){
    // valida el form si es incorrecto no permite hacer nada y queda allí mismo
    if (form.invalid) { return; }
    // dispara un alert cargando
    Swal.fire({
      text: 'Espere por favor...',
      icon: 'info',
      allowOutsideClick: false
    });
    // esto es el icono de sale dando vueltas como cargando
    Swal.showLoading();
    // llamamos el metodo del servicio con el metodo subscribe
    this.auth.login( this.usuario )
        .subscribe( resp =>{
          // si todo esta ok cerramos en alert anterior
          Swal.close();
          // guarda en localStorage el email
          if ( this.recordarme ) {
            localStorage.setItem('email', this.usuario.email);
          }
          // redirecciona a la pagina siguiente
          this.router.navigateByUrl('/home');
          // se define un tal caso falle
        }, (err) => {
          // se imprime el error en consola
          // console.log(err.error.error.message);
          // se imprime mejor un alert indicando que los datos estan mal
          Swal.fire({
            title: 'Error al autenticar.',
            text: 'Datos Incorrectos.',
            icon: 'error'
          });
        });
  }

}
