import Head from 'next/head'
import Image from 'next/image'

import Layout, {siteTitle} from '../components/Layout';
import Header from '../components/sections/header'
import Main from '../components/sections/main'
import Footer from '../components/sections/footer'

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

