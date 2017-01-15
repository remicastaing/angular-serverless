import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';

import { AuthService } from '../components/Auth/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;


  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {

    this.userForm = fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([
        Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.name = this.userForm.controls['name'];
    this.email = this.userForm.controls['email'];
    this.password = this.userForm.controls['password'];
  }

  ngOnInit() {
  }

  onSubmit(value) {
    console.log(value);

    this.authService.createUser(value.name,value.email,value.password ).subscribe((result) => {
      if (result) {
        console.log(result);
        //this.router.navigate(['']);
      }
    });
  }
}
