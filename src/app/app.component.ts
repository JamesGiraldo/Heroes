import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SPA';
  public chats: Observable<any[]>;
  constructor( private activatedRoute: ActivatedRoute,               
               private router: Router,
               firestore: AngularFirestore
    ){

    this.chats = firestore.collection('chats').valueChanges();
  }
  verHeroes(){
    this.router.navigate( ['heroes'] )
  }
}
