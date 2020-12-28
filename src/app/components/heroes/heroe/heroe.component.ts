import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { HeroeModel } from '../../../models/heroe.model';
import { HeroesService } from '../../../servicios/heroes.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();    
  heroes: HeroeModel[] = [];
  cargando = false;

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute,
               private router: Router,
               private location: Location ) { }

  ngOnInit() {  
    this.cargando = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.heroesService.getHeroe( id )
      .subscribe( (resp: HeroeModel) => {
        this.heroe = resp;          
        this.heroe.id = id;
        this.cargando = false;
      });          
  }
  
  borrarHeroe( id: string ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ this.heroe.nombre }`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.heroesService.borrarHeroe( id ).subscribe();
        this.router.navigate(['/home']);
      }
    });
  }

  onRegresar(){
    this.location.back();
  }

}
