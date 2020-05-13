import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from "../User";
import { UserService } from "../../services/user.service";
import { AuthentificationService } from "../../services/authentification.service";
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService]
})
export class UserListComponent implements OnInit {

  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id','firstName', 'lastName', 'email'];
  users: User[];
  sortedData: User[];

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // get refereence to paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private userService: UserService, private authService: AuthentificationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.sortedData = users.slice();
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  isAdmin(){
    if(this.authService.admin && !this.displayedColumns.includes('show')){
      this.displayedColumns.push('show');
        this.displayedColumns.push('update');
        this.displayedColumns.push('delete');
      }
     return this.authService.admin;
  }
}