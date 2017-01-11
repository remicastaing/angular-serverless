import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {User} from './user.model';
import { Subject }     from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: APIService) { 

  }

  getMe(){
  	 return this.http.get('/api/users/me').map((_res) => {
      let res = _res.json();
      return new User(res.name, res.email, res.role);
     });
  }



}
