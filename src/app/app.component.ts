import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from './services/authentification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-app-angular-test';

constructor(
        private router: Router,
        private authService: AuthentificationService
    ) {
        }

  logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

   getCanConnected(){
     return this.authService.connected;
   }

   isAdmin(){
       return this.authService.admin;
     }
}
