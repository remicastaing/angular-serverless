import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../components/Auth/auth.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(email, password) {

    this.authService.login(email, password).subscribe((result) => {
      if (result) {
        console.log(result);
        this.router.navigate(['']);
      }
    });
  }
}