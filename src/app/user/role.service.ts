import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8070/roles';

    getRoles() {
    return this.http.get<string[]>(this.baseUrl + '?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
  }
}
