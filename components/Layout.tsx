import { useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { useSpring } from "react-spring";
import tw, { styled, css } from "twin.macro";
import { BsWhatsapp, BsArrowUp } from "react-icons/bs";

import { Button } from "@/components/Elements";
import useIsMobile from "@/components/hooks/useIsMobile";
import { getWhatsappLink } from "@/static/ts/constants";
import Header from "@/components/Sections/header";
import Footer from "@/components/Sections/Footer";
import Alert from "./Alert";
import { Divider } from "@/components/Blog/layout";

interface Props {
  children: React.ReactNode;
  preview?: boolean;
}
const Main = tw.main`before:bg-primary-tint-3 before:w-full before:h-24 before:z-[-1] before:absolute before:top-0 before:left-0`;
const TopBttnContainer = styled.div((props: { visible: boolean }) => [
  css`
    & > button {
      z-index: ${props.visible ? 10 : -1};
    }
  `,
]);

const Layout = ({ preview, children }: Props): JSX.Element => {
  const isMobile = useIsMobile();
  const [isInView, setIsInView] = useState<boolean>(true);
  const { scrollY } = useScroll();

  const topBttnSpring = useSpring({
    opacity: isInView ? 1 : 0,
  });

  useEffect(() => {
    scrollY.onChange((latest) => {
      if (latest > 400) {
        setIsInView(true);
      } else setIsInView(false);
    });
  }, [scrollY]);

  return (
    <div>
      <Main>
        {preview && <Alert preview={preview} />}
        <Header />
        {children}
        <Divider />
        <Footer />
        <a href={getWhatsappLink(isMobile)} target="_blank" rel="noreferrer">
          <div tw="fixed md:w-[3.75rem] md:h-[3.75rem] leading-[63px] bottom-6 left-6 bg-primary hover:bg-primary-shade-1 text-white rounded-full text-center text-[35px] shadow-sm hover:shadow-md z-10 transition-all w-16 h-16 flex items-center justify-center">
            <BsWhatsapp />
          </div>
        </a>
        <TopBttnContainer visible={isInView}>
          <Button
            elType="icon"
            disabled={!isInView}
            tw="fixed bottom-6 right-6"
            style={topBttnSpring}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            Icon={() => (
              <>
                <BsArrowUp />
              </>
            )}
          />
        </TopBttnContainer>
      </Main>
    </div>
  );
};

export default Layout;
