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
    

    await this.getData();
  }

  logout() {
    firebase.auth().signOut().then(function () {
    }, function (error) {
      // An error happened.
    });
    this.router.navigate(['']);
  }
  async getData(){
    var user = await firebase.auth().currentUser;
    console.log(user);
    this.name = user.displayName;
    this.photoUrl = user.photoURL;
    this.email = user.email;
  }
}
