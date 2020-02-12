import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  connected: boolean = false;

  constructor(private http: HttpClient) { }

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
      'Content-type': 'application/x-www-form-urlencoded'
    }

    return this.http.post('http://localhost:8090/' + 'oauth/token', loginPayload, {headers});
  }

  logout() {
    window.sessionStorage.removeItem('token');
    this.connected = false;
  }
}
