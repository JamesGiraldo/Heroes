import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router, private auth: AuthService ){ }

  ngOnInit(): void {
  }

  buscarHeroe( termino: string){        
    if (termino.length > 0) {
       this.router.navigate( ['/buscar',termino] );
     } else {
       this.router.navigate( ['/heroes'] )
     }
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
