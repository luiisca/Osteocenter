import Head from "next/head";
import { GetStaticProps } from "next";
import type { NextPage } from "next";

import Main from "../components/Sections/main";
import { SITE_TITLE } from "@/static/ts/constants";
import { featuredPostsQuery } from "@/utils/sanity/queries";

const Home: NextPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>
          {SITE_TITLE} | Clínica ortopédica en Chimbote - Reserva tu cita en
          linea
        </title>
        <meta
          name="description"
          content="Empresa dedicada a la prevención, atención y recuperación de patologías que afectan al sistema músculo esquelético. Contamos con especialistas altamente capacitados. Separa citas, recibe tratamiento, prescripciones y haz consultas a tu medico todo desde nuestra plataforma en linea."
          key="desc"
        />
      </Head>
      <Main />
    </>
  );
};

export const getStaticProps: GetStaticProps<any> = async () => {
  const { QueryClient, dehydrate } = await import("react-query");
  const { sanityClient } = await import("@/utils/sanity/sanity.server");

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
