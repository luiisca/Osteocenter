import Head from 'next/head';
import Script from 'next/script';
import Header from './Sections/header';

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
        <Header />
        {children}
      </main>
    </div>
  )
}

export default Layout;
