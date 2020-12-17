import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  constructor( private activatedRoute: ActivatedRoute,
               private router: Router
    ){
  }
  verHeroes(){
    this.router.navigate( ['heroes'] )
  }

}
