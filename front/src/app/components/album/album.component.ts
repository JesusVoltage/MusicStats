import { Component, OnInit, Input } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { stringify } from '@angular/core/src/util';

declare var firebase;
var db = firebase.firestore();


@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

  private session: boolean;
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

  private criticas: any;
  private hayCriticas: boolean = false;
  constructor(private spotify: SpotifyService, private activatedRouter: ActivatedRoute, private router: Router) {

    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };

    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     //Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
  }

  async ngOnInit() {



    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.session = true;
        this.user = user;
      } else {
        this.session = false;
      }
    });
    await this.activatedRouter.params.subscribe(routeParams => {
      this.idAlbum = this.activatedRouter.snapshot.params['id'];

      this.artistas = '';
      this.canciones = [];
      this.spotify.getAlbumData(this.idAlbum)
        .subscribe((data: any) => {
          this.albumData = data;
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

    await this.getCriticas();
    if (this.criticas.length > 0) this.hayCriticas = true;

  }


  async addCritica(form: NgForm) {
    //comprueba conexion

    let text = String(form.value.text);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    let fecha = dd + '/' + mm + '/' + yyyy;
    await db.collection('criticas').add({
      avataruser: this.user.photoURL,
      fecha: fecha,
      id_album: this.idAlbum,
      nameuser: this.user.displayName,
      texto: text,
    }).then(function () {
      console.log('dates saved');
      window.location.reload();

    });


  }

  async getCriticas() {
    let album = this.idAlbum;
    let critics: any[] = [];

    await db.collection('criticas').where("id_album", "==", album)
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

          let critica = {
            avataruser: doc.data().avataruser,
            fecha: doc.data().fecha,
            id_album: doc.data().id_album,
            nameuser: doc.data().nameuser,
            texto: doc.data().texto,
          }
          critics.push(critica);

        });


      })
    this.criticas = critics;

  }

  async puntuar(puntos: number){
    /**comprueba session del usuario */
    if(this.session = true){

      let id_user = this.user.uid;
      let id_album = this.idAlbum;
      let yaVotado: boolean;
      //**comprueba si el usuario ha votado ya ese disco */
      


      await db.collection('punt_user').where("id_album", "==", id_album).where("id_user", "==", id_user)
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

          if(doc.data()){
            
          }

        });


      })







      //**to the poitnt user data */

      console.log(id_album, id_user, puntos);

      await db.collection('punt_user').add({
        id_album: id_album,
        id_user: id_user,
        puntos: puntos,
      }).then(function () {
        console.log('dates saved');
  
      });



    }

  }


}
