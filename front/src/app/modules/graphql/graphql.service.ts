import { Injectable } from '@angular/core';
import { createApolloFetch } from 'apollo-fetch';

const uri =  '/api/graphql';
const authUri =  '/api/graphql/auth';

@Injectable()
export class GraphqlService {
  apolloFetch;
  authApolloFetch;

  constructor() {
    this.apolloFetch = createApolloFetch({ uri });
    this.authApolloFetch = createApolloFetch({ uri: authUri });
    this.authApolloFetch.use(authMiddleware);
   }

   fetch(args) {
    return this.apolloFetch(args);
   }

   authFetch(args) {
    return this.authApolloFetch(args);
   }
}


const authMiddleware = ({ request, options }, next) => {

    const token = localStorage.getItem('auth_token');

    if (!options.headers) {
      options.headers = {};  // Create the headers object if needed.
    }
    options.headers['authorization'] = `Bearer ${token}`;
    next();
  };

