import Head from 'next/head';
import Button from '../components/Button';

export const siteTitle = 'Osteocenter';
const Layout = ({children}) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content="Osteocenter" />

        {/* Calendly start */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
        {/* Calendly end */}

      </Head>
      <main>
        <Button primary>Click me!</Button>
        {children}
      </main>
    </div>
  )
}

export default Layout;
