import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  albums: any[] = [];
  private open: boolean = false;
  private clicked: boolean = false;
  private session: boolean = false;
  private user: any[] = [];
  constructor(
    private spotify: SpotifyService,
    private router: Router,
    ) { }

  buscar(termino: string) {


    // this.loading = true;
    this.spotify.getAlbums(termino)
      .subscribe((data: any) => {


        this.albums = data;
        if (termino.length > 2) {
          this.open = true;
        } else {
          this.open = false;
        }
      });

      
  }


  async ngOnInit() {
    
    await firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.session = true;
        console.log(user);
        this.user[0] = user.displayName;
        this.user[1] = user.photoURL;
      }else{
        this.session = false;
      }
    });



  }

  onLink(){
    this.clicked = true;
  }

  onInput(){
    this.clicked = false;
  }


}
