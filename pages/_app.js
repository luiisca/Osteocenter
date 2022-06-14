import {Fragment} from 'react';
// import GlobalStyles from '../components/GlobalStyles';

function MyApp({Component, pageProps}) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
}
  // <GlobalStyles />

export default MyApp
