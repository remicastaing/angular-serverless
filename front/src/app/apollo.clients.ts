import { ApolloClient, createNetworkInterface, } from 'apollo-client';


const authApolloMiddleware = {
  applyMiddleware(req, next) {

    const token = localStorage.getItem('auth_token');

    if (!req.options.headers) {
      req.options.headers = {};  // Create the headers object if needed.
    }
    req.options.headers['authorization'] = `Bearer ${token}`;
    next();
  }
};

const networkInterface = createNetworkInterface({ uri: '/api/graphql' });

const client = new ApolloClient({
  networkInterface: networkInterface
});

const authenticatedNetworkInterface = createNetworkInterface({ uri: '/api/graphql/auth' });

authenticatedNetworkInterface.use([authApolloMiddleware]);

const authenticatedClient = new ApolloClient({
  networkInterface: authenticatedNetworkInterface
});

export function provideClients() {
  return {
    default: client,
    auth: authenticatedClient,
  };
}
