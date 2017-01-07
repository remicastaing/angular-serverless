import { Injectable } from '@angular/core';
import {User} from './user.model';
import {APIService} from './api.service';
import { Subject }     from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
	currentUser : Subject<User>= new Subject();;

  constructor(private http: APIService) { 

  }

  getMe(){
  	 this.http.get('/api/users/me').subscribe((_res) => {
  		let res = _res.json();
      this.currentUser.next(new User(res.name, res.email, res.role));
    	});
  }



}
