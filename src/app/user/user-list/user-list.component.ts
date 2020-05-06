import { Component, OnInit } from '@angular/core';
import { User } from "../User";
import { UserService } from "../../services/user.service";
import { AuthentificationService } from "../../services/authentification.service";
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  private dataSource: MatTableDataSource<User>;
  private displayedColumns: string[] = ['id','firstName', 'lastName', 'email'];

  constructor(private router: Router,
              private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource = new MatTableDataSource(users);
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectNewUserPage() {
    this.router.navigate(['/user/create']);
  }

  editUserPage(user: User) {
    if (user) {
      this.router.navigate(['/user/edit', user.id]);
    }
  }

   deleteUser(user: User) {
    if (user) {
      this.userService.deleteUser(user.id).subscribe(
        res => {
          this.getAllUsers();
          this.router.navigate(['/user']);
        }
      );
    }
  }

  isAdmin(){
    if(this.authService.admin && !this.displayedColumns.includes('operations')){
        this.displayedColumns.push('operations');
      }
     return this.authService.admin;
  }

}