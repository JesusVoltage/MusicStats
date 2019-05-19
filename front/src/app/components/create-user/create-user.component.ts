import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserService]
})
export class CreateUserComponent implements OnInit {

  constructor(private userService: UserService) {

   }

  ngOnInit() {
  }

  addUser(form: NgForm){
    console.log('formulario', form.value);
    this.userService.postUser(form.value).subscribe(res =>{
      console.log('this is the res', res);
    });
  }


}
