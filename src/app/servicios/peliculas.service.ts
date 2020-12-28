import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { tap, map, delay, catchError } from 'rxjs/operators';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseURL: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  public cargando: boolean = false;


  get params(){
    return{
      api_key: 'd0e4bd59114e59a06d75ec35d3b21b02',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }


  constructor( private http: HttpClient ) {  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera():Observable<Movie[]> {

    if ( this.cargando ) {
      // cargando peliculas
      return  of([]);
    }

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.baseURL }/movie/now_playing`, {
      params: this.params
    }).pipe(
      map( (resp) => resp.results ),
      delay(1000),
      tap( () => {
        this.carteleraPage += 1;
        this.cargando = false;
      })
    );
  }

  buscarPeliculas( texto: string ):Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };
    // https://api.themoviedb.org/3/search/movie
    return this.http.get<CarteleraResponse>(`${ this.baseURL }/search/movie`,{
      params
    }).pipe(
      map( resp => resp.results ),
      delay(1000)
    )
  }

  getPeliculaDetalle( id: string ){
    return this.http.get<MovieResponse>(`${ this.baseURL }/movie/${ id }`, {
      params: this.params
    }).pipe(
      delay(1000),
      catchError( err => of(null) )
    )
  }

  getCast( id: string ): Observable<Cast[]> {
    return this.http.get<CreditsResponse>(`${ this.baseURL }/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      delay(1000),
      catchError( err => of( [] ) )
    );
  }

}
