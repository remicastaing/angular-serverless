import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import gql from 'graphql-tag';

import { GraphqlService } from '../../modules/graphql/graphql.service';

const awesomeThingsQuery = gql`
  {
    things
    {
      name
      info
      img
    }
  }`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public awesomeThings: Observable<any>;

  constructor(private graphql: GraphqlService) { }

  ngOnInit() {
    this.awesomeThings = this.graphql.fetch({ query: awesomeThingsQuery }).then((results) => {
      return results.data.things;
    });
  }
}


