import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { Movie } from '../../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscarpelicula',
  templateUrl: './buscarpelicula.component.html',
  styleUrls: ['./buscarpelicula.component.css']
})
export class BuscarpeliculaComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[] = [];
  public cargando = false;

  constructor( private activatedRoute: ActivatedRoute, private peliculasService: PeliculasService, private router: Router ) { }

  ngOnInit(): void {
    this.cargando = true;
    // recibir los valores de los parametros de la ruta
    this.activatedRoute.params.subscribe( params =>{
      this.texto = params.texto;      
      // llamar el servicio de busqueda
      this.peliculasService.buscarPeliculas( params.texto ).subscribe( movies =>{
        // console.log("Pelicula --> ", movies );  
        this.movies = movies.filter( movie => movie.backdrop_path !== null );
        this.cargando = false;
      })      
    })
  }

  buscarPelicula ( texto: string ) {
    texto = texto.trim();
    if( texto.length === 0){ return; }    
    this.router.navigate( [ '/buscar' , texto ] );
  }

}
