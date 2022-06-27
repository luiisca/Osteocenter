import type {AppProps} from 'next/app';

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

import GlobalStyles from '../components/GlobalStyles';


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
