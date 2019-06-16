import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var firebase;
var db = firebase.firestore();
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: any = firebase.auth().currentUser;
  private name: string;
  private email: string;
  private photoUrl: string
  private uid: any;
  private emailVerified: any;
  private newAvatar: string;
  private avatares: string[];
  private border: boolean[];
  constructor(private router: Router, private ngZone: NgZone) { }

  async ngOnInit() {

    


    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = user.displayName;
        this.photoUrl = user.photoURL;
        this.email = user.email;
        this.uid = user.uid;

      } else {

      }
      this.ngZone.run(() => console.log("ok"))

    });

    this.getAvatars();

  }

  async getAvatars(){
    let photos: string[] = [];
    let bordecito: boolean[] = [];
    await db.collection('avatares')
      .get()
      .then(function (querySnapshot) {

        querySnapshot.forEach(function (doc) {

          photos.push(doc.data());
          bordecito.push(false);
        });
      })
    this.avatares = photos;
    this.border = bordecito;
  }

  selectAvatar(url:string, i: number){
    
    for(let j = 0 ; j < this.border.length ; j++){
      this.border[j]=false;
    }
    this.newAvatar = url;

    this.border[i] = true;

  }

  cambiarAvatar() {
    let avatarsito = this.newAvatar;
    console.log(avatarsito);
    var user = firebase.auth().currentUser;
    user.updateProfile({
      photoURL: avatarsito,
    }).then(function() {

      window.location.reload();


    }).catch(function (error) {
    });
  }






  logout() {
    firebase.auth().signOut().then(function () {
    }, function (error) {
      // An error happened.
    });
    this.router.navigate(['']);
  }

  deleteUser() {
    var user = firebase.auth().currentUser;

    user.delete().then(function () {
      // User deleted.
    }).catch(function (error) {
      // An error happened.
    });
    this.router.navigate(['']);
  }

}
