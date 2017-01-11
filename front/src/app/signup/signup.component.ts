import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../components/Auth/auth.service';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(name, email, password) {

    this.authService.createUser(name, email, password).subscribe((result) => {
      if (result) {
        console.log(result);
        //this.router.navigate(['']);
      }
    });
  }
}
