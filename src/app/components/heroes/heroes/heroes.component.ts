import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../../servicios/heroes.service';
import { HeroeModel } from '../../../models/heroe.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  page: number = 1;
  heroes: HeroeModel[] = [];
  cargando = false;


  constructor( private heroesService: HeroesService,
               private router: Router ) { }

  ngOnInit() {

    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe( resp => {
        this.heroes = resp;
        this.cargando = false;
      });

  }

  borrarHeroe( heroe: HeroeModel, i: number ) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.nombre }`,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if ( resp.value ) {
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe( heroe.id ).subscribe();
      }
    });
  }


}
