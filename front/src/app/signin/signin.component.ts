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
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public submitted : Boolean = false;
  errors = {login: undefined};

  signinForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;

  

  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {
    this.signinForm = fb.group({
      'email': ['', Validators.compose([
        Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.email = this.signinForm.controls['email'];
    this.password = this.signinForm.controls['password'];
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this.submitted = true;

    if (form.valid){
      this.authService.login(form.value.email, form.value.password).subscribe(
        (result) => {
          console.log(result);
          if (result) {
            
            this.router.navigate(['home']);
            
          }
        },
        (result) => {
          console.log(result.json());
          this.errors.login = result.json().message;
        });      
    }

  }
}