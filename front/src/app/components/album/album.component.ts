import { Component, OnInit, Input, NgZone } from '@angular/core';
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

  private session: boolean = false;
  private user: any;
  private beCritic: boolean = false;
  private idAlbum: string = "";
  private albumData: any;
  public img: string = '';
  public type: string = '';
  public name: string = '';
  public artistas: string = '';
  public ano: string = '';
  public canciones: any[] = [];

  private criticas: any;
  public hayCriticas: boolean = false;

  public userPuntos: String;
  public albumPuntos: String;
  constructor(private ngZone: NgZone,private spotify: SpotifyService, private activatedRouter: ActivatedRoute, private router: Router) {

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

    
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.user = user;
        this.session = true;
      }else{
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
    await this.getAlbumData();

    if (this.criticas.length > 0) this.hayCriticas = true;
    await this.getUserPuntos();


    console.log('esta es la buena',this.session);
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
  async createPuntuacion(id_user: string, id_album: string, puntos: number) {

    await db.collection('punt_user').add({
      id_album: id_album,
      id_user: id_user,
      puntos: puntos,
    }).then(function () {
      console.log('dates saved');

    });
    this.createAlbumPuntation(puntos, null , 1);
  }
  async updatePuntuacion(id_user: string, id_album: string, puntos: number) {
    let colID: string;
    await db.collection('punt_user').where("id_album", "==", id_album).where("id_user", "==", id_user)
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

          colID = doc.id;
        });

      })
    this.actualizaPuntuacion(colID, puntos)
    

  }

  async actualizaPuntuacion(id: string, puntos: number) {
    let puntuacionAntigua : number;
    let cantidadAntigua : number = 0;
    let ref = db.collection("punt_user").doc(String(id));

    await db.collection("punt_user").where("id_album", "==", this.idAlbum).where("id_user", "==", this.user.uid)
    .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {
          puntuacionAntigua = Number( doc.data().puntos);
        });

      })
    this.createAlbumPuntation(puntos, puntuacionAntigua, cantidadAntigua);

    return ref.update({
      puntos: puntos
    })
      .then(function () {
        console.log("Document successfully updated!");
      })

  }


  async puntuar(puntos: number) {
    this.userPuntos = String(puntos);
    /**comprueba session del usuario */
    if (this.session) {

      let id_user = this.user.uid;
      let id_album = this.idAlbum;
      let yaVotado: boolean;
      //**comprueba si el usuario ha votado ya ese disco */
      console.log(id_album, id_user)
      await db.collection('punt_user').where("id_album", "==", id_album).where("id_user", "==", id_user)
        .get()
        .then(function (querySnapshot) {
          //si tiene puntiacion
          if (querySnapshot.docs.length == 0) {
            yaVotado = false;
            //si no tiene puntuacion
          } else {
            yaVotado = true;

          }

        })
      if (yaVotado) {
        this.updatePuntuacion(id_user, id_album, puntos);
      } else {
        this.createPuntuacion(id_user, id_album, puntos);
      }

    }else{
      this.session = false;
    }

  }

  async getUserPuntos() {
    if (this.session) {
      let puntitos: string;
      let id_user = this.user.uid;
      let id_album = this.idAlbum;
      let yaVotado: boolean;
      //**comprueba si el usuario ha votado ya ese disco */
      console.log(id_album, id_user)
      await db.collection('punt_user').where("id_album", "==", id_album).where("id_user", "==", id_user)
        .get()
        .then(function (querySnapshot) {
          //si tiene puntiacion
          if (querySnapshot.docs.length == 0) {
            yaVotado = false;
            puntitos = 'vota'
          } else {
            querySnapshot.forEach(function (doc) {
              puntitos = String(doc.data().puntos);
            });
          }

        })
      this.userPuntos = puntitos;
    }

  }

  async getAlbumData() {
    let puntuacion: number;
    //comprobamos si el album tiene puntuaciones
    await db.collection('puntuaciones').where("id_album", "==", this.idAlbum)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs.length == 0) {
          puntuacion = 0;
        } else {
          querySnapshot.forEach(function (doc) {
            puntuacion = Number(doc.data().puntuacion);
          });
        }

      })
    this.albumPuntos = String(puntuacion);
  }
  async createAlbumPuntation(puntos: number, old: number, cantidadNueva: number) {
    console.log(puntos, old, cantidadNueva);
    //comprobamos si el album tiene puntuaciones
    let tiene: boolean;
    let albumPuntuacionId: string;
    let puntitos: number;
    let cantidad: number;
    let TOTAL: number;
    await db.collection('puntuaciones').where("id_album", "==", this.idAlbum)
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.docs.length == 0) {
          tiene = false;
        } else {
          tiene = true;
          querySnapshot.forEach(function (doc) {
            albumPuntuacionId = doc.id;
            puntitos = doc.data().puntuacion;
            cantidad = doc.data().cantidad;
            TOTAL = doc.data().puntos;
            console.log(doc.data());
          });
        }

      })
    if (tiene) {
    
      this.updateAlbumPuntuacion(puntos, old, albumPuntuacionId, puntitos,cantidad,cantidadNueva, TOTAL);
    } else {
      this.newAlbumPuntos(puntos)
    }
  }
  async newAlbumPuntos(puntos: number) {
    await db.collection('puntuaciones').add({
      cantidad: 1,
      id_album: this.idAlbum,
      puntuacion: puntos,
      puntos: puntos,
    }).then(function () {
      console.log('dates saved');

    });
    this.albumPuntos = String(puntos);
  }
  async updateAlbumPuntuacion(puntos:number, oldPuntos: number, albumPuntuacionId: string, puntitos:number, cantidad: number , cantidadNueva: number, TOTAL: number){
    console.log(cantidad, cantidadNueva)
    let newCantidad = cantidad + cantidadNueva;
    let newTOTAL = TOTAL+(puntos - oldPuntos);
    let newCUENTA = newTOTAL /newCantidad;

    
    let ref = await db.collection("puntuaciones").doc(String(albumPuntuacionId));
    ref.update({
      puntos: newTOTAL,
      puntuacion: newCUENTA,
      cantidad: newCantidad,
    }).then(function () {
      console.log("Document successfully updated!!!!!!!!!!!!1");
    })
    this.albumPuntos = String(newCUENTA);
  }
}
