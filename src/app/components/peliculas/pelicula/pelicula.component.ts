import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from '../../../servicios/peliculas.service';
import { MovieResponse } from '../../../interfaces/movie-response';
import { Cast } from '../../../interfaces/credits-response';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieResponse;
  public cast: Cast[] = [];
  public cargando = false;

  constructor( private activatedRoute: ActivatedRoute, private router: Router, private location: Location , private peliculasService: PeliculasService ) { }

  ngOnInit(): void {
    this.cargando = true;
    // Obtener el id de la URL
    const { id } = this.activatedRoute.snapshot.params;    
    // con esto obtimizamos el código de abajo
    // lo que hace es almacenar los dos subscribe en uno solo y listo funciona igual.
    combineLatest([
      this.peliculasService.getPeliculaDetalle( id ),
      this.peliculasService.getCast( id )    
      // destructura de objeto 
    ]).subscribe( ( [ pelicula, cast ] ) =>{
        if ( !pelicula ){
          this.router.navigateByUrl('/peliculas');
        return;
      }   
      this.movie = pelicula;
      this.cast = cast.filter( actor => actor.profile_path !== null );
      this.cargando = false;
    });

    // this.peliculasService.getPeliculaDetalle( id ).subscribe( movie =>  {
    //   if ( !movie ){
    //     this.router.navigateByUrl('/peliculas');
    //     return;
    //   }
    //   this.movie = movie;
    //   this.cargando = false;
    // });

    // this.peliculasService.getCast( id ).subscribe( cast => {
    //   if ( !cast ){
    //     this.router.navigateByUrl('/peliculas');
    //     return;
    //   }
    //   this.cast = cast.filter( actor => actor.profile_path !== null );
    //   this.cargando = false;
    // });
  }
  
  onRegresar(){
    this.location.back();
  }

}
