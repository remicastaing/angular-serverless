import { Component, OnInit } from '@angular/core';
import { User } from '../components/Auth/user.model';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	public isCollapsed = true;
	public currentUser : User;

  constructor() { }

  ngOnInit() {
  	this.currentUser= new User('Admin', 'admin@exemple.com', 'admin');
  	}

}
