import {Fragment} from 'react';
import type {AppProps} from 'next/app';
import GlobalStyles from '../components/GlobalStyles';

import ApolloProvider from '../graphql/apollo';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
