import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public awesomeThings: Observable<any> = new Observable();


  constructor(private http: Http) { }

  ngOnInit() {
    this.awesomeThings = this.http.get('/api/things')
      .map(res => res.json());
  }

}
