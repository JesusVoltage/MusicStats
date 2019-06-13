import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading = false;

  constructor(private router : Router){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          this.isLoading = true;
      } else {
          this.isLoading = false;
      }
    });
  }
  title = 'front';


  onActivate(event) {
    window.scroll(0,0);
}

}


