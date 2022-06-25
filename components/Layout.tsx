import Head from 'next/head';
import Header from './Sections/header';

export const siteTitle: string = 'Osteocenter';

interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props): JSX.Element => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content="Osteocenter" />
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default Layout;
