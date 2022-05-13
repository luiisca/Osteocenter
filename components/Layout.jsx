import Head from 'next/head';
import Button from './Button';
import Nav from './Nav';
import Script from 'next/script';

export const siteTitle = 'Osteocenter';
const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content="Osteocenter" />

        {/* Calendly start */}
        <Script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async />
        {/* Calendly end */}
      </Head>
      <main>
        <Nav />

        {/*{children} */}
      </main>
    </div>
  )
}
// <Button href='#'> Click me!</Button>

export default Layout;
