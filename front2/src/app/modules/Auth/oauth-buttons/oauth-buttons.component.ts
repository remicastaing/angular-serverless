import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-oauth-buttons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './oauth-buttons.component.html',
  styleUrls: ['./oauth-buttons.component.css']
})
export class OauthButtonsComponent implements OnInit {

  constructor(private authService: AuthService) {


  }

  loginOauth = function (provider) {

    this.authService
      .getFacebookID()
      .subscribe((client_id) => {

        const location = 'https://www.facebook.com/v2.5/dialog/oauth' +
          '?client_id=' + client_id +
          '&redirect_uri=' + window.location.protocol + '//' + window.location.host + '/callback' +
          '&scope=email';
        console.log(location);
        window.location.href = location;
      });


  };

  ngOnInit() {

  }



}
