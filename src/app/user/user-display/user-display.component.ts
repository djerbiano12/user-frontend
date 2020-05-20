import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserService } from "../../services/user.service";
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})
export class UserDisplayComponent implements OnInit {

  id: number;
  user: User;
  user_role: string;
  roles: string[];

  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router, private userService: UserService) { }

    ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    if (this.id) { //infos to display
      this.userService.getUserById(this.id).subscribe(
        user => {
            this.user = user;
            this.user_role = this.userService.getUserWithSelectedRole(user).role;
         },error => {
          console.log(error);
         }
      );

    }
  }
  
 redirectUserPage() {
   this.router.navigate(['/users']);
 }
}
