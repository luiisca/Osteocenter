import Head from "next/head";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import Main from "../components/Sections/main";
import { SITE_TITLE } from "@/static/ts/constants";
import { sanityClient } from "@/utils/sanity/sanity.server";
import { featuredPostsQuery } from "@/utils/sanity/queries";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Main />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["featuredPosts"], () =>
    sanityClient.fetch(featuredPostsQuery)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
