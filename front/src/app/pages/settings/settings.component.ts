import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule
} from '@angular/forms';
import { AuthService } from '../../modules/Auth';



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
  errors = {
    oldpassword: undefined,
    form: undefined
  };
  message = null;


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

    this.authService
      .changePassword(form.currentpassword, form.password)
      .subscribe(
      (result) => {
        console.log(result);
        this.errors.oldpassword = undefined;
        this.errors.form = undefined;
        this.message = 'Your password has been succesfully updated.';
        this.changePasswordForm.reset();

      },
      (result) => {
        console.log(result);

        switch (result.status) {
          case 200:
            break;
          case 403:
            console.log(result);
            this.errors.oldpassword = result.json().message;
            break;
          default:
            console.log(result);
            this.errors.form = result.message;
            break;
        }
      });
  }
}

const passwordMatcher = (control: AbstractControl): { [key: string]: boolean } => {
  const password = control.get('password');
  const confirm = control.get('confirm');
  if (!password || !confirm) return null;
  return password.value === confirm.value ? null : { nomatch: true };
};
