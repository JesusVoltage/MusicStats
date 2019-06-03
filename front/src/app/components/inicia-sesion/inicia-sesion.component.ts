import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inicia-sesion',
  templateUrl: './inicia-sesion.component.html',
  styleUrls: ['./inicia-sesion.component.scss'],
  providers: [UserService]

})
export class IniciaSesionComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log('formulario', form.value);
    this.userService.postUser(form.value).subscribe(res => {
      console.log('this is the res', res);
    });
  }


}
