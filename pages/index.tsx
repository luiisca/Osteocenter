import Head from "next/head";
import type { NextPage } from "next";
import Layout, { siteTitle } from "../components/Layout";
import Main from "../components/Sections/main";

const Home: NextPage = (): JSX.Element => {
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
  );
};

export default Home;
