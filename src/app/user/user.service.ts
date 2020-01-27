import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from "./User";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8090/users';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  canConnect(email: string, password: string) {
    return this.http.get<Boolean>(this.baseUrl + '/' + email + '/auth/' + password);
  }
}
