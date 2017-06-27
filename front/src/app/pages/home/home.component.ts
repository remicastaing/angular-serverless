import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const awesomeThingsQuery = gql`
  {
    things
    {
      name
      info
      img
    }
  }`;

interface QueryResponse {
  things;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public awesomeThings: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.awesomeThings = this.apollo.watchQuery<QueryResponse>({ query: awesomeThingsQuery })
      .map((data) => {
        return data.data.things;
      });
  }
  
}


