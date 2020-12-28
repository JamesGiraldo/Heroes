import { Component,HostListener,  OnDestroy,  OnInit } from '@angular/core';
import { PeliculasService } from '../../../servicios/peliculas.service';
import { Movie } from '../../../interfaces/cartelera-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSliderShow: Movie[] = [];
  public cargando = false;
  @HostListener('window:scroll', ['$event'])

  onScroll(){
    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) * 6300;
    const maxima = (document.documentElement.scrollHeight || document.body.scrollHeight);
    if ( posicion > maxima ) {
      // console.log("Llamar Servicio de pelicula");
      if ( this.peliculasService.cargando ) {
        return;
      }else{
        this.peliculasService.getCartelera().subscribe( movies => {
          this.movies.push( ...movies );
        })
      }
    }
  }

  constructor( private peliculasService: PeliculasService, private router: Router ) {  }

  ngOnInit(): void {
    this.cargando = true;
    this.peliculasService.getCartelera()
    .subscribe( movies => {
      // console.log(resp.results);
      this.movies = movies.filter( movie => movie.backdrop_path !== null );
      this.moviesSliderShow = movies.filter( movie => movie.backdrop_path !== null );
      this.cargando = false;
    })
  }

  buscarPelicula ( texto: string ) {

    texto = texto.trim();
    if( texto.length === 0){ return; }

    this.router.navigate( [ '/buscar' , texto ] );

  }

  ngOnDestroy(){
    this.peliculasService.resetCarteleraPage();
  }

}
