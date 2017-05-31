import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../modules/Auth/user.model';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	@Input() profile: User;

  constructor() { }

  ngOnInit() {

  	
  }

}
