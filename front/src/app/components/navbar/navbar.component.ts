import { Component, OnInit, NgZone } from '@angular/core';
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
  public open: boolean = false;
  public clicked: boolean = false;
  public session: boolean = false;
  public userName: string;
  public userPhoto: string;
  constructor(
    private spotify: SpotifyService,
    private router: Router,
    private ngZone: NgZone
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


  ngOnInit() {
    
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.userName = user.displayName;
        this.userPhoto = user.photoURL;
        this.session = true;
      }else{
        this.session = false;

      }
      this.ngZone.run(() => console.log("ok"))

      console.log(this.session);
    });

  }

  ngOnDestroy( ){

  }

  async goTo(id : String){
    await this.router.navigate(['album/'+id]).then(() => {
      window.location.reload();


    });
  }

  onLink(){
    this.clicked = true;
  }

  onInput(){
    this.clicked = false;
  }


}
