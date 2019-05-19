import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  selectedUser: User;
  users : User[];
  readonly URL = 'http://localhost:3000/api/users';


  constructor( private http: HttpClient) { 
    this.selectedUser = new User();

  }
  
  postUser(user : User){
    return this.http.post(this.URL, user);
    console.log(this.URL, user);
  }

  getUser(){
    return this.http.get(this.URL);
  }


  updateUser( user : User){
    return this.http.put(this.URL + `/${user._id}`, user);    
  }

  deleteUser( _id : String){
    return this.http.delete(this.URL + `/${_id}`);
  }

}
