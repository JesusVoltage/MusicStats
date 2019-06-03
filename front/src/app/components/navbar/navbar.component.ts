import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  albums: any[] = [];

  constructor(private spotify: SpotifyService) { }

  buscar(termino: string) {
    console.log(termino);

    // this.loading = true;
    this.spotify.getAlbums(termino)
      .subscribe((data: any) => {
        console.log(data);
          this.albums = data;
        
      });
  }


  ngOnInit() {
  }

}
