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
export class CreateUserComponent implements OnInit  {

  constructor(
    private router: Router) { }
  ngOnInit() {

  }

  agregar(form: NgForm){
    console.log(form);
    //validar
    let email = form.value.email;
    let password = form.value.password1;
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });


    var user = firebase.auth().currentUser;

    if (user) {

      user.updateProfile({
        displayName: form.value.name,
        photoURL: "https://cdn2.iconfinder.com/data/icons/multimedia-part-1/32/headphones-man-512.png"
      }).then(function() {
      }).catch(function(error) {
      });
      console.log('done',form.value.name);
    } else {
      console.log('dont done');

    }
    
    
    this.router.navigate(['']);

  }





}
