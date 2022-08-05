import Head from "next/head";
import Footer from "@/components/Sections/Footer";
import tw from "twin.macro";

import Alert from "./Alert";
import { SITE_TITLE } from "@/static/ts/constants";

import { Divider } from "@/components/Blog/layout";
import Header from '@/components/Sections/header'

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}
const Main = tw.main`before:bg-primary-tint-3 before:w-full before:h-24 before:z-[-1] before:absolute before:top-0 before:left-0`;

const Layout = ({ preview, children }: Props): JSX.Element => {
  return (
    <div>
      <Head>
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="description" content="Osteocenter" />
      </Head>
      <Main>
        {preview && <Alert preview={preview} />}
        <Header />
        {children}
        <Divider />
        <Footer />
      </Main>
    </div>
  );
};

export default Layout;
