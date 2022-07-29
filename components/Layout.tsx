import Head from "next/head";
import Header from "./Sections/header";
import tw, { styled, css } from "twin.macro";

import Alert from "./Alert";
import { SITE_TITLE } from "@/static/ts/constants";
import { MdArrowLeft, MdArrowRight, MdClose } from "react-icons/md";

import { Button } from "@/components/Elements";

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}
const Main = tw.main`before:bg-primary-tint-3 before:w-full before:h-24 before:z-[-1] before:absolute before:top-0 before:left-0`;

const Layout = ({ preview, children }: Props): JSX.Element => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="description" content="Osteocenter" />
      </Head>
      <Main>
        {preview && <Alert preview={preview} />}
        <Header />
        {children}
      </Main>
    </div>
  );
};

export default Layout;
