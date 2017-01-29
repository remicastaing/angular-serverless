import { Injectable } from '@angular/core';
import {APIService} from './api.service';
import {User} from './user.model';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private api: APIService) { 

  }

  getMe(){
  	 return this.api.get('/api/users/me').map((_res) => {
      let res = _res.json();
      return new User(res._id, res.name, res.email, res.role);
     });
  }



}
