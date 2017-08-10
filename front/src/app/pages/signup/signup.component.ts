import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';

import { AuthService } from '../../modules/Auth';
import { passwordMatcher } from './password-matcher';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirm: AbstractControl;
  errors = { signup: undefined };


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, fb: FormBuilder) {

    this.userForm = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'confirm': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    }, { validator: passwordMatcher });
    this.name = this.userForm.controls['name'];
    this.email = this.userForm.controls['email'];
    this.password = this.userForm.controls['password'];
    this.confirm = this.userForm.controls['confirm'];
  }

  ngOnInit() {

  }

  onSubmit(value) {
    this.authService
      .createUser(value.name, value.email, value.password)
      .subscribe((result) => {
        console.log(result);
        if (result) {
          this.router.navigate(['home']);
        }
      },
      (err) => {
        console.log(err);
        this.errors.signup = err.error.message;
      });
  }
}
