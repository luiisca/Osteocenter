import Head from 'next/head'

import Layout, {siteTitle} from '../components/Layout';
import Main from '../components/Sections/main';

export default function Home(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
    </Head>
    <Main />
    {/*
            <Footer />
        */}
    </Layout>
  )
}

