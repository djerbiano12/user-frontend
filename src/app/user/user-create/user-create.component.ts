import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import { EncrDecrService } from "../encr-decr-service.service";
import {User} from "../User";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent implements OnInit, OnDestroy {

  id: number;
  user: User;

  userForm: FormGroup;
  private sub: any;
  conversionEncryptOutput:string;  
  conversionDecryptOutput:string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService, 
              private EncrDecr: EncrDecrService) { }

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
      password: new FormControl('', Validators.required)
    });

    if (this.id) { //edit form
      this.userService.getUserById(this.id).subscribe(
        user => {
            this.id = user.id;
            this.userForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: this.EncrDecr.get('123456$#@$^@1ERF', user.password)
          });
         },error => {
          console.log(error);
         }
      );

    }
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
          this.EncrDecr.set('123456$#@$^@1ERF', this.userForm.controls['password'].value));
          this.userService.updateUser(user).subscribe();

      } else {
        let user: User = new User(null,
          this.userForm.controls['firstName'].value,
          this.userForm.controls['lastName'].value,
          this.userForm.controls['email'].value,
          this.EncrDecr.set('123456$#@$^@1ERF', this.userForm.controls['password'].value));
        this.userService.createUser(user).subscribe();

      }

      this.userForm.reset();
      this.router.navigate(['/user']);

    }
  }

  redirectUserPage() {
    this.router.navigate(['/user']);

  }
}