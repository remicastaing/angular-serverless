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
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
	changePasswordForm: FormGroup;
  currentpassword: AbstractControl;
  password: AbstractControl;
  confirm: AbstractControl;
  errors = {login: undefined};


  constructor(private authService: AuthService, private router: Router, fb: FormBuilder) {

    this.changePasswordForm = fb.group({
    	'currentpassword': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'confirm': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    }, { validator: passwordMatcher });
    this.currentpassword = this.changePasswordForm.controls['currentpassword'];
    this.password = this.changePasswordForm.controls['password'];
    this.confirm = this.changePasswordForm.controls['confirm'];
  }

  ngOnInit() {
  }

  onSubmit(form) {
  	console.log(form);
    this.authService.changePassword(form.currentpassword,form.password ).subscribe(
    	(result) => {
    		console.log(result);
    	},
      (result) => {
        console.log(result.json());
        this.errors.login = result.json().message;
      });
  }
}

const passwordMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const password = control.get('password');
  const confirm = control.get('confirm');
  if (!password || !confirm) return null;
  return password.value === confirm.value ? null : { nomatch: true };
};