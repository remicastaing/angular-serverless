import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../components/Auth/user.model';
import {Observable} from 'rxjs';
import { UserService} from '../components/Auth/user.service';

@Component({
  selector: 'navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public isCollapsed = true;
	public currentUser : Observable<User>;

  constructor(private userService: UserService) { 
  	this.currentUser = userService.currentUser;
  }

  ngOnInit() {
  	//this.currentUser= new User('Admin', 'admin@exemple.com', 'admin');
  	}

}
