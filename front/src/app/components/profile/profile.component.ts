import { Component, OnInit } from '@angular/core';
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


  constructor(private router: Router) { }

  async ngOnInit() {
    
    var user = await firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    
    console.log(this.user);
    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
  }

  logout() {
    firebase.auth().signOut().then(function () {
    }, function (error) {
      // An error happened.
    });
    this.router.navigate(['']);
  }

}
