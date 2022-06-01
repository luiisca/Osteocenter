import {Fragment, useState} from 'react'

import Head from 'next/head'
import Image from 'next/image'

import {siteTitle} from '../components/Layout';
import Header from '../components/containers/header'
import Main from '../components/containers/main'
import Footer from '../components/containers/footer'

import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header />
      <Main />
      <Footer />
    </Fragment>
  )
}

