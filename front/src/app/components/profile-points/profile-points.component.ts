import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { getUrlScheme } from '@angular/compiler';
import { stringify } from '@angular/core/src/render3/util';
import { Router } from '@angular/router';
declare var firebase;
var db = firebase.firestore();

interface puntitos {
  id_album: string;
  photo: string;
  puntos: string;
}


@Component({
  selector: 'app-profile-points',
  templateUrl: './profile-points.component.html',
  styleUrls: ['./profile-points.component.scss']
})
export class ProfilePointsComponent implements OnInit, OnChanges {

  @Input() idUser: any;

  private calificaciones: any;
  private newPuntos: Array<puntitos> = [];
  constructor(private spotify: SpotifyService, private router: Router) { }

  ngOnInit() {

  }

  async ngOnChanges() {

    let puntuaciones: any[] = [];
    if (this.idUser != undefined) {
      await db.collection('punt_user').where("id_user", "==", this.idUser)
        .get()
        .then(function (querySnapshot) {

          querySnapshot.forEach(function (doc) {

            puntuaciones.push(doc.data());
          });
        })

    }
    await this.getPhotos(puntuaciones);
  }

  async goToAlbum(id: String) {
    await this.router.navigate(['album/'+id]).then(() => {
      window.location.reload();


    });;
  }
  async getPhotos(puntuaciones: any) {
    

    for (let i = 0; i < puntuaciones.length; i++) {

        this.spotify.getPhotoAlbum(puntuaciones[i].id_album).subscribe((data: any) => {
        // newPuntuaciones.set(puntuaciones.id_album, data, puntuaciones.puntos);
        this.newPuntos.push({
          id_album: puntuaciones[i].id_album,
          photo: data,
          puntos: puntuaciones[i].puntos
        });
        
        
      });
    }
    
  }

}
