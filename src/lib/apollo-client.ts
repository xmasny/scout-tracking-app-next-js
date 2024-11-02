import 'server-only';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';

const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://rickandmortyapi.com/graphql',
    }),
  });
};

export const { getClient, PreloadQuery, query } = registerApolloClient(createApolloClient);
