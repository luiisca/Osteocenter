import {PropsWithChildren} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // useQuery,
  // gql
} from "@apollo/client";
import {GRAPHQL_ENDPOINT} from '../static/ts/constants';

const GraphCMSApolloProvider = ({children}: PropsWithChildren): JSX.Element => {
  const spaceXClient = new ApolloClient({
    uri: GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={spaceXClient}>
      {children}
    </ApolloProvider>
  )
}

export default GraphCMSApolloProvider
