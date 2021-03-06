import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// paginatión
import { NgxPaginationModule } from 'ngx-pagination';

// Estrellitas
import { RatingModule } from 'ng-starrating';

// rutas
import { AppRoutingModule } from './app-routing.module';
// import { APP_ROUTING } from './app.routes';

// servicios
import { HeroesService } from './servicios/heroes.service';

// este es para inicializar el fire base o conexión
import { AngularFireModule } from "@angular/fire";
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';

// credenciales de enviroments
import { environment } from '../environments/environment';

// componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HeroesComponent } from './components/heroes/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe/heroe.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { FormComponent } from './components/heroes/form/form.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PeliculaComponent } from './components/peliculas/pelicula/pelicula.component';
import { BuscarpeliculaComponent } from './components/peliculas/buscarpelicula/buscarpelicula.component';
import { PeliculasComponent } from './components/peliculas/peliculas/peliculas.component';
import { SlideshowComponent } from './components/peliculas/slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './components/peliculas/peliculas-poster-grid/peliculas-poster-grid.component';
import { PosterPipe } from './pipes/peliculas/poster.pipe';
import { CastSlideshowComponent } from './components/peliculas/cast-slideshow/cast-slideshow.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    HeroesComponent,
    HeroeComponent,
    LoginComponent,
    RegistroComponent,
    FormComponent,
    FooterComponent,
    PeliculaComponent,
    BuscarpeliculaComponent,
    PeliculasComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    PosterPipe,
    CastSlideshowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // APP_ROUTING
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgxPaginationModule,
    RatingModule
  ],
  providers: [
    HeroesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
