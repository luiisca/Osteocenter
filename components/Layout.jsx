import Head from 'next/head';
import Script from 'next/script';

import {Nav, Heading} from '../components';

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
        <Heading as='span' subHeading>Hello World!</Heading>
        <Heading primary>Hello World!</Heading>
        <Heading as='h2' secondary>Hello World!</Heading>
        <Heading as='h3' tertiary>Hello World!</Heading>

        {/*{children} */}
      </main>
    </div>
  )
}
// <Button href='#'> Click me!</Button>

export default Layout;
