import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { User } from '../../modules/Auth/user.model';
import { AuthService } from '../../modules/Auth';


import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isNavbarCollapsed = true;

  currentUser: Observable<User>;

  constructor(private auth: AuthService, private store: Store<fromRoot.State>) {
     this.currentUser = store.select(fromRoot.getCurrentUser);
  }

  logout() {
    console.log('logout');
    this.auth.logout();
  }

  ngOnInit() {

  }



}
