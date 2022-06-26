import { ApolloProvider } from '@apollo/client'
import type {AppProps} from 'next/app';
import GlobalStyles from '../components/GlobalStyles';

import { useApollo } from '../lib/apolloClient'

function MyApp({Component, pageProps}: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
