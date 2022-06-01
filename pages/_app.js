import {Fragment} from 'react';
import GlobalStyles from '../components/GlobalStyles';

function MyApp({Component, pageProps}) {
  return (
    <Fragment>
      <GlobalStyles />
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
