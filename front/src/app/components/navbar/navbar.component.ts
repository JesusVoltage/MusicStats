import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  albums: any[] = [];
  private open: boolean = false;

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


  ngOnInit() {


  }

  // goToAlbum(id: String): void{
  //   console.log(id);
  //   this.router.navigate(['album/'+id]);
  // }

}
