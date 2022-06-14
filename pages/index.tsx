import Head from 'next/head'

import Layout, {siteTitle} from '../components/Layout';
import Main from '../components/Sections/main';
import Footer from '../components/Sections/footer';

export default function Home() {
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

