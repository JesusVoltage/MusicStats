import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


declare var firebase;

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {

  private name: string;

  constructor(
    private router: Router) { }
  ngOnInit() {

  }

  async agregar(form: NgForm) {
    //validar
    this.name = form.value.name;
    let email = form.value.email;
    let password = form.value.password1;
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    }).then(function () {

      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: form.value.name,
        photoURL: "https://cdn2.iconfinder.com/data/icons/multimedia-part-1/32/headphones-man-512.png"
      }).then(function() {

      }).catch(function (error) {
      });
    });
    this.goToHome();
  }
 

  async goToHome() {
    await this.router.navigate(['']).then(() => {
      window.location.reload();


    });;
  }




}
