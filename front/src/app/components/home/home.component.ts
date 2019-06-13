import { Router, ActivatedRoute, UrlSegment, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

declare var firebase
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private zone: NgZone) { 

  }

  async ngOnInit() {
    await firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
      }else{
      }

    });
  }


}
