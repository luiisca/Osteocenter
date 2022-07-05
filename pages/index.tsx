import Head from "next/head";
import type { NextPage } from "next";
import Layout, { siteTitle } from "../components/Layout";
import Main from "../components/Sections/main";
import { Plate } from "@udecode/plate";

const Home: NextPage = (): JSX.Element => {
  const initialValue = [
    {
      type: "p",
      children: [
        {
          text: "This is editable plain text with react and history plugins, just like a <textarea>!",
        },
      ],
    },
  ];
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Main />

      <Plate
        editableProps={{
          placeholder: "Type…",
          style: {
            padding: "15px",
          },
        }}
        initialValue={initialValue}
      />
      {/*
            <Footer />
        */}
    </Layout>
  );
};

export default Home;
