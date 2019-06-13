import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var firebase;
@Component({
  selector: 'app-inicia-sesion',
  templateUrl: './inicia-sesion.component.html',
  styleUrls: ['./inicia-sesion.component.scss'],

})
export class IniciaSesionComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit() {

  }

  login(form: NgForm) {
    let email = form.value.email;
    let password = form.value.password;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    })
    this.router.navigate(['']);
  }


}
