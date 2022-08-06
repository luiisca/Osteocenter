import tw from "twin.macro";

import Header from "@/components/Sections/header";
import Footer from "@/components/Sections/Footer";
import Alert from "./Alert";
import { Divider } from "@/components/Blog/layout";

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}
const Main = tw.main`before:bg-primary-tint-3 before:w-full before:h-24 before:z-[-1] before:absolute before:top-0 before:left-0`;

const Layout = ({ preview, children }: Props): JSX.Element => {
  return (
    <div>
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
