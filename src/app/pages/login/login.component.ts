import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** Crear una nueva instnacia de nuestro usuario */
  /** incializar nuestra instancia, para seguir un patron logico */
  public usuario: UsuarioModel = new UsuarioModel();
  /** propiedad para recordar email */
  public recordarme: boolean = false;

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {

    // cuando se inicialice el componente verifica si existe un email en el localStorage y se le coloca en el input ese valor 
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login(form: NgForm) {

    // manejar errores
    try {
      /** validar  si es invalido el formaulrio */
      if (form.invalid) { return; }

      // utilizar angularfire2 para mostrar un loading
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor.'
      })
      // para que quede el cargando :D
      Swal.showLoading();

      // llamar el servicio.
      this.auth.login(this.usuario).subscribe(resp => {
        console.log(resp)
        Swal.close();

        // si recordar exite guarda el email en localStorage
        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }

        // redireccionar a la siguiete pagina
        this.router.navigateByUrl('/home');

        /** capturar el error que devuelve el servicio  */
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          allowOutsideClick: false,
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        })
      })
    } catch (error) {
      console.log(error);
    }


  }

}
