import { ApolloClient, InMemoryCache } from '@apollo/client';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

// ! subscription doesn't work
// const wsLink = process.window
//   ? new WebSocketLink({
//       // if you instantiate in the server, the error will be thrown
//       uri: `ws://localhost:3001/graphql`,
//       options: {
//         reconnect: true,
//       },
//       webSocketImpl: ws,
//     })
//   : null;

const httplink = new HttpLink({
  uri: 'http://localhost:3001/graphql',
});

const link = process.window
  ? split(
      //only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        console.log('split');
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      // wsLink,
      httplink
    )
  : httplink;

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
