import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.scss']
})
export class TopsComponent implements OnInit {


  private topEspana: any[] = [];
  private topEspana2: any[] = [];

  private topRock: any[] = [];
  private topRock2: any[] = [];

  private recomendacionUrl: any;
  private recomendacionNombre: any;
  private recomendacionId: any;
  private recomendationArtista: any;
  private generos: string[] = ['Rock', 'Metal', 'Punk', 'Latino', 'Techno', 'Pop', 'Jazz', 'Blues']
  constructor(private spotify: SpotifyService, private router: Router) { }

  ngOnInit() {
    this.getTopEspaña();
    this.getTopRock();
    this.spotify.searchPlaylist()
    .subscribe((data: any) => {
console.log(data);
    });
  }

  getTopEspaña() {


    this.spotify.getTopEspaña()
      .subscribe((data: any) => {
        
        this.topEspana.push(data[0], data[1], data[2], data[3], data[4]);
        this.topEspana2.push(data[5], data[6], data[7], data[8], data[9]);

      });
  }

  getTopRock() {
    this.spotify.getTopRock()
      .subscribe((data: any) => {
        this.topRock.push(data[0], data[1], data[2], data[3], data[4]);
        this.topRock2.push(data[11], data[6], data[7], data[8], data[9]);
        this.recomendacionUrl = data[0].track.album.images[0].url
        this.recomendacionNombre = data[0].track.album.name;
        this.recomendacionId = data[0].track.album.id;
        this.recomendationArtista =data[0].track.artists[0].name;
      });
  }

  goToAlbum(id: String): void {
    this.router.navigate(['album/:id']);
  }

  async toRecomendation(genero: String) {
    let numerito = Math.floor(Math.random() * (40 + 1))
    String(genero);
    switch (genero) {
      case "Rock":
        this.spotify.getRock()
          .subscribe((data: any) => {
            this.recomendacionUrl =  data[numerito].track.album.images[0].url;
            this.recomendacionNombre = data[numerito].track.album.name;
            this.recomendacionId = data[numerito].track.album.id;
            this.recomendationArtista = data[numerito].track.artists[0].name;

          });
        break;

      case "Metal":
        this.spotify.getMetal()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerito].track.album.images[0].url
            this.recomendacionNombre = data[numerito].track.album.name
            this.recomendacionId = data[numerito].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;
          });
        break;

      case "Punk":
        this.spotify.getPunk()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerito].track.album.images[0].url
            this.recomendacionNombre = data[numerito].track.album.name
            this.recomendacionId = data[numerito].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;

          });
        break;

      case "Latino":
        this.spotify.getLatino()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerito].track.album.images[0].url
            this.recomendacionNombre = data[numerito].track.album.name
            this.recomendacionId = data[numerito].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;

          });
        break;
      case "Techno":
        this.spotify.getTechno()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerito].track.album.images[0].url
            this.recomendacionNombre = data[numerito].track.album.name
            this.recomendacionId = data[numerito].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;

          });
        break;
      case "Pop":
        this.spotify.getPop()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerito].track.album.images[0].url
            this.recomendacionNombre = data[numerito].track.album.name
            this.recomendacionId = data[numerito].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;

          });
        break;
      case "Jazz":
        this.spotify.getJazz()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerito].track.album.images[0].url
            this.recomendacionNombre = data[numerito].track.album.name
            this.recomendacionId = data[numerito].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;
          });
        break;
      case "Blues":
        let numerita = Math.floor(Math.random() * (17 + 1))
        this.spotify.getBlues()
          .subscribe((data: any) => {
            this.recomendacionUrl = data[numerita].track.album.images[0].url
            this.recomendacionNombre = data[numerita].track.album.name
            this.recomendacionId = data[numerita].track.album.id
            this.recomendationArtista = data[numerito].track.artists[0].name;
          });
        break;
      default:
        break;
    }


  }
}
