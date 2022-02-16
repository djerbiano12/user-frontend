import { Component, OnInit } from '@angular/core';
import {User} from "../User";
import {UserService } from "../../services/user.service";
import {ActivatedRoute, Router} from '@angular/router';
import {UserPicture} from "../UserPicture";


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
            this.user = this.getPictures(user);
         },error => {
          console.log(error);
         }
      );
    }
  }
  
 redirectUserPage() {
   this.router.navigate(['/users']);
 }

 getPictures(user: User){
      let retrievedImage: any;
      let base64Data: any;
      let retrieveResonse: UserPicture;
          this.userService.getPictureByEmail(user.email).subscribe(
            res => {
              retrieveResonse = res;
              base64Data = retrieveResonse.picByte;
              retrievedImage = 'data:image/jpeg;base64,' + base64Data;
              user.retrievedImage = retrievedImage;
            }
          );
       return user;
    }
}
