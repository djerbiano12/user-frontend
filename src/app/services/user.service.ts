import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {User} from "../user/User";
import { Role } from '../user/role';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/users';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserByEmail(email: string) {
    return this.http.get<User>(this.baseUrl + '/email/' + email + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  setUserPicture(picture: FormData) {
    return this.http.post(this.baseUrl + '/upload' + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token,picture);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }

  getUserWithSelectedRole(user: User){
    let listeRoles = user['roles'].map(a => a.name);
    if(listeRoles.indexOf(Role.Admin) > -1){
       user.role = Role.Admin;
      } else if(listeRoles.indexOf(Role.User) > -1){
        user.role = Role.User;
      }
      return user;
  }
}
