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
        <title>
          Clínica ortopédica en Chimbote - Reserva tu cita en linea |{" "}
          {SITE_TITLE}
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
