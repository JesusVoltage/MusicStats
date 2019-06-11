import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

declare var firebase;
var db = firebase.firestore();


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {


  private user: any;
  private beCritic: boolean = false;
  private idAlbum: string = "";
  private albumData: any;
  private img: string = '';
  private type: string = '';
  private name: string = '';
  private artistas: string = '';
  private ano: string = '';
  private canciones: any[] = [];
  constructor(private spotify: SpotifyService, private activatedRouter: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    

    this.user = firebase.auth().currentUser;
    this.activatedRouter.params.subscribe(routeParams => {
      this.idAlbum = this.activatedRouter.snapshot.params['id'];

     


      this.artistas = '';
      this.canciones = [];
      this.spotify.getAlbumData(this.idAlbum)
        .subscribe((data: any) => {
          this.albumData = data;
          console.log(this.albumData);
          this.img = this.albumData['images'][0].url
          this.name = this.albumData['name'];
          for (let index = 0; index < this.albumData.artists.length; index++) {
            this.artistas += (String(this.albumData.artists[index].name));
            if (index > 0 && index < this.albumData.artists.length) {
              this.artistas += ' - ';
            }
          }
          for (let index = 0; index < data['tracks'].items.length; index++) {
            this.canciones.push(data['tracks'].items[index].name);

          }
          this.ano = data['release_date'];
          this.type = data['album_type'];
        });
    });

    this.getCriticas();

  }
  addCritica(form: NgForm) {

    //comprueba conexion
        let text = String(form.value.text);
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        let fecha = dd + '/' + mm + '/' + yyyy;
        db.collection('criticas').add({
          fecha: fecha,
          id_album: this.idAlbum,
          id_user: this.user.uid,
          texto: text,
        }).then(function(){
          console.log('dates saved');
        });


  }

  getCriticas(){
    let album = this.idAlbum;
    console.log(album);
    let criticas = db.collection('criticas');
    let query = criticas.where("texto", "==", "asdf");
    console.log(query);
  }

}
