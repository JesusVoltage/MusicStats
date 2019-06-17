import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { SpotifyService } from './services/spotify.service';
import { HttpClient } from '@angular/common/http';
import {  OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})







export class AppComponent implements OnInit{

  isLoading = true;

  constructor(private router : Router, private spotify : SpotifyService, private http :HttpClient){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          this.isLoading = true;
      } else {
          //this.isLoading = false;
      }
    });
  }
  title = 'front';

  async ngOnInit(){
    await this.http.get(`http://localhost:3000/token`);
  }


  onActivate(event) {
    window.scroll(0,0);
}

}


