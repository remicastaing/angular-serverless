import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../modules/Auth/user.model';
import {BehaviorSubject} from 'rxjs';
import { AuthService} from '../../modules/Auth';

@Component({
  selector: 'navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public isNavbarCollapsed = true;
	public currentUser : BehaviorSubject<User>;
  public isLoggedIn : BehaviorSubject<Boolean>;


  constructor(private auth: AuthService) { 
    this.currentUser = this.auth.currentUser;
    this.isLoggedIn = this.auth.isLoggedIn;

  }

  logout(){
  	console.log('logout');
  	this.auth.logout();
  }

  ngOnInit() {

  	}



}
