import Head from 'next/head'
import Image from 'next/image'

import Layout, {siteTitle} from '../components/Layout';
import Header from '../components/containers/header'
import Main from '../components/containers/main'
import Footer from '../components/containers/footer'

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

