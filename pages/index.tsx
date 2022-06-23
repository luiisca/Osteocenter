import Head from 'next/head';
import type {NextPage} from 'next';

import Layout, {siteTitle} from '../components/Layout';
import Main from '../components/Sections/main';
import {useLaunchListQuery} from '../generated';

const Home: NextPage = (): JSX.Element => {
  const {data, error, loading} = useLaunchListQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {data?.launches?.map((launch) => {
        return (
          <>
            <h1>{launch?.mission_name}</h1>
            <p>Launch Year: {launch?.launch_year}</p>
            <p>Flight number: {launch?.flight_number}</p>
          </>
        )
      })} || <p>No Launches</p>
      {/*
    <Main />
            <Footer />
        */}
    </Layout>
  )
}

export default Home
