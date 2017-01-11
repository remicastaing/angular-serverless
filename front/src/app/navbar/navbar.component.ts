import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../components/Auth/user.model';
import {BehaviorSubject} from 'rxjs';
import { AuthService} from '../components/Auth/auth.service';

@Component({
  selector: 'navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public isCollapsed = true;
	public currentUser : BehaviorSubject<User>;


  constructor(private auth: AuthService) { 
    this.currentUser = this.auth.currentUser
  }

  logout(){
  	console.log('logout');
  	this.auth.logout();
  }

  ngOnInit() {

  	}



}
