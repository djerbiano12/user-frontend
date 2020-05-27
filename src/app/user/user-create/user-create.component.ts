import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService } from "../../services/user.service";
import {RoleService } from "../role.service";
import { EncrDecrService } from "../encr-decr-service.service";
import {User} from "../User";
import {ActivatedRoute, Router} from '@angular/router';
import { UniqueEmailValidatorDirective } from '../../directives/unique-email-validator.directive';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: number;
  user: User;
  roles: string[];
  editForm: boolean = false;

  userForm: FormGroup;
  private sub: any;
  conversionEncryptOutput:string;  
  conversionDecryptOutput:string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private roleService: RoleService, 
              private EncrDecr: EncrDecrService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]),
      role :new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("([0-9]{10})")
      ])
    });

    if (this.id) { //edit form
      this.editForm = true;
      this.userService.getUserById(this.id).subscribe(
        user => {
            this.userForm.reset();
            this.id = user.id;
            this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: this.userService.getUserWithSelectedRole(user).role,
            phoneNumber: user.phoneNumber
          });
         },error => {
          console.log(error);
         }
      );

    }
    this.getAllRoles();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.id) {
        let user: User = new User(this.id,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.EncrDecr.set('123456$#@$^@1ERF', this.userForm.controls['password'].value),
          this.userForm.controls['role'].value,
          this.userForm.controls['phoneNumber'].value);
          this.userService.updateUser(user).subscribe(users => {this.router.navigate(['/users']);this.notificationService.success('Contact successfully updated');},err => {console.log(err);});

      } else {
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.EncrDecr.set('123456$#@$^@1ERF', this.userForm.controls['password'].value),
          this.userForm.controls['role'].value,
          this.userForm.controls['phoneNumber'].value);
        this.userService.createUser(user).subscribe(users => {this.router.navigate(['/users']);this.notificationService.success('Contact successfully added');},err => {console.log(err);});

      }

      this.userForm.reset();

    }
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      },
      err => {
        console.log(err);
      }

    );
  }

  redirectUserPage() {
    this.router.navigate(['/users']);
    this.notificationService.warn('No changes have been saved');
  }
}