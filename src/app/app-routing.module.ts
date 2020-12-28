import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// import componentes
import { HomeComponent } from './components/home/home.component';
import { HeroesComponent } from './components/heroes/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe/heroe.component';
import { FormComponent } from './components/heroes/form/form.component';
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { PeliculasComponent } from './components/peliculas/peliculas/peliculas.component';
import { BuscarpeliculaComponent } from './components/peliculas/buscarpelicula/buscarpelicula.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component'

const routes: Routes = [
  // LandingPage
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  // Rutas de heroes y su CRUD
  { path: 'heroes', component: HeroesComponent, canActivate: [ AuthGuard ] },
  { path: 'heroe/:id', component: HeroeComponent, canActivate: [ AuthGuard ] },
  { path: 'form/:id', component: FormComponent, canActivate: [ AuthGuard ] },
  // rutas de sesión de pelicula
  { path: 'peliculas', component: PeliculasComponent, canActivate: [ AuthGuard ] },
  { path: 'pelicula/:id', component: PeliculaComponent, canActivate: [ AuthGuard ] },
  { path: 'buscar/:texto', component: BuscarpeliculaComponent, canActivate: [ AuthGuard ] },
  // Rutas de login y registro
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  // Redirecciona si la pagina no exite manda a el LandingPage
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
