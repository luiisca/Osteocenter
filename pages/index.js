import Head from 'next/head'
import Image from 'next/image'

import Layout, {siteTitle} from '../components/Layout';
import Header from '../components/Sections/header';
import Main from '../components/Sections/main';
import Footer from '../components/Sections/footer';
import Test from '../components/TestDetailsLayout/Test';
import TestProvider from '../components/TestDetailsLayout/TestProvider';

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

