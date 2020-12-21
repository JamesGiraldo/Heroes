import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HeroeModel } from '../../../models/heroe.model';
import { HeroesService } from '../../../servicios/heroes.service';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();    

  constructor( private heroesService: HeroesService,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {  
    const id = this.route.snapshot.paramMap.get('id');
    this.heroesService.getHeroe( id )
      .subscribe( (resp: HeroeModel) => {
        this.heroe = resp;          
        this.heroe.id = id;
      });          
  }
  
}
