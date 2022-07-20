import Head from "next/head";
import Header from "./Sections/header";
import Alert from "./Alert";

import tw from "twin.macro";
export const siteTitle: string = "Osteocenter";

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
        <meta name="og:title" content={siteTitle} />
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
