import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../components/Auth/auth.service';

class UserForm {
   constructor(public email?: string,
               public password?: string) {
   }
}

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public submitted : Boolean = false;

  user = new UserForm();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(form) {
    this.submitted = true;

    if (form.form.valid){
      this.authService.login(form.form.value.email, form.form.value.password).subscribe((result) => {
        if (result) {
          console.log(result);
          this.router.navigate(['']);
        }
      });      
    }

  }
}