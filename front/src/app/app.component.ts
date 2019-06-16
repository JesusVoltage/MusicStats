import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { SpotifyService } from './services/spotify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading = true;

  constructor(private router : Router, private spotify : SpotifyService){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          this.isLoading = true;
      } else {
          //this.isLoading = false;
      }
    });
  }
  title = 'front';

  ngOnInit(){
    let clave = this.spotify.getToken();
 
  }


  onActivate(event) {
    window.scroll(0,0);
}

}


