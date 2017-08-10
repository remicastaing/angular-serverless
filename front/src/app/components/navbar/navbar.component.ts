import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { User } from '../../modules/Auth/user.model';
import { AuthService } from '../../modules/Auth';


import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isNavbarCollapsed = true;
  @select(['currentUser', 'currentUser']) currentUser: Observable<User>;

  constructor(private auth: AuthService) {

  }

  logout() {
    console.log('logout');
    this.auth.logout();
  }

  ngOnInit() {

  }



}
