import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

declare var firebase;
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


  constructor(private router: Router,private ngZone: NgZone) { }

  async ngOnInit() {
    

    await firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.name = user.displayName;
        this.photoUrl = user.photoURL;
        this.email = user.email;
        this.uid = user.uid;
      }else{

      }
      this.ngZone.run(() => console.log("ok"))

    });
  }

  logout() {
    firebase.auth().signOut().then(function () {
    }, function (error) {
      // An error happened.
    });
    this.router.navigate(['']);
  }
 
}
