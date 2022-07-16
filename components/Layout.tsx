import Head from "next/head";
import Header from "./Sections/header";
import Alert from "./Alert";

export const siteTitle: string = "Osteocenter";

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}

const Layout = ({ preview, children }: Props): JSX.Element => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content="Osteocenter" />
      </Head>
      <main>
        {preview && <Alert preview={preview} />}
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Layout;
