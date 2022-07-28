import Head from "next/head";
import type { NextPage } from "next";
import Main from "../components/Sections/main";

import { SITE_TITLE } from "@/static/ts/constants";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Main />
      {/*
            <Footer />
        */}
    </>
  );
};

export default Home;
