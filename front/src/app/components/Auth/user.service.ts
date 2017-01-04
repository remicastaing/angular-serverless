import { Injectable } from '@angular/core';
import {User} from './user.model';
import {APIService} from './api.service';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	currentUser : User;

  constructor(private http: APIService) { 

  }

  getMe() {
    return this.http.get('/api/users/me').subscribe((_res) => {     
      let res = _res.json();
      this.currentUser = new User(res.name, res.email, res.role);
      console.log(this.currentUser);
    } );
  }



}
