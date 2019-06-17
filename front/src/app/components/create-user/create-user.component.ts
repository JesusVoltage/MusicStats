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

  public name: string;
  public email: string;
  public password1 : string;
  public vpassword2 : string;

  public emailNot : boolean = true;
  public passwordLong : boolean = true;
  public passwordNot : boolean = true;
  constructor(
    private router: Router) { }
  ngOnInit() {

  }

  async agregar(form: NgForm) {
    //validar
    let validado = false;

    this.passwordNot = true;
    this.passwordLong = true;
    this.emailNot = true;



    if(this.validateEmail(form.value.email)){

      if(String(form.value.password1).length > 4){

        if(form.value.password1 != form.value.password2){

          this.passwordNot = false;
        }

      }else{
        this.passwordLong = false;
      }

      validado = true;

    }else{
      this.emailNot = false;
    }

    //
    if(validado){

      this.name = form.value.name;
      let email = form.value.email;
      let password = form.value.password1;
      await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
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
  }
 

  async goToHome() {

    
    await this.router.navigate(['']).then(() => {
      window.location.reload();


    });;
  }


  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }



}
