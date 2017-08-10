import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';


import { AuthService } from '../auth.service';


@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      const code = params['code'];
      console.log(code);
      if (code) {
        this.authService
        .createFBUser(code, window.location.href)
        .subscribe((result) => {
          console.log(result);
          if (result) {
            this.router.navigate(['home']);
          }
        },
        (err) => {
          console.log(err);
        });
      }
    });
  }
}
