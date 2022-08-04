import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Turn as Hamburger } from "hamburger-react";
import { useSpring, animated } from "react-spring";
import { useScroll } from "framer-motion";

import tw, { styled, css, theme } from "twin.macro";
import Nav from "../Nav";

const Container = styled(animated.header)(() => [
  tw`sticky top-0 z-30 flex items-center justify-between h-24 px-8 bg-primary-tint-3 shadow-sm`,
]);

const Logo = styled.a(() => [
  tw`block relative min-w-[200px] h-full flex items-center`,
  css`
    & > span {
      ${tw`min-w-[200px]`}
    }
  `,
]);

const Overlay = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`left-0 absolute z-[-1] w-full h-screen top-full bg-transparent`,
  !isOpen && tw`hidden`,
]);

const LogoWrap = () => (
  <Link href="/" passHref>
    <Logo>
      <Image
        priority={true}
        layout="responsive"
        width="360"
        height="77"
        sizes="80vw"
        alt="osteocenter logo"
        src="/img/osteocenter-logo.png"
      />
    </Logo>
  </Link>
);
const Header = (): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(undefined as unknown as boolean);
  const [isInView, setIsInView] = useState<boolean>(true);
  const [navHeight, setNavHeight] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const { scrollY } = useScroll();
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHeaderHeight(headerRef?.current?.clientHeight || 0);
  }, [headerRef?.current?.clientHeight, setHeaderHeight]);

  const headerSpring = useSpring({
    transform: isInView ? "translateY(0px)" : `translateY(-${headerHeight}px)`,
  });
  const navSpring = useSpring({
    position: "absolute",
    left: 0,
    top:
      isOpen === undefined
        ? "-1000px"
        : isOpen
        ? `${headerHeight}px`
        : `-${navHeight - headerHeight}px`,
  });

  useEffect(() => {
    scrollY.onChange((latest) => {
      if (latest > lastScrollY) {
        setIsInView(false);
      } else {
        setIsInView(true);
      }
      setLastScrollY(latest);
    });
  }, [scrollY, lastScrollY, headerHeight]);

  return (
    <Container ref={headerRef} style={headerSpring}>
      <>
        <div tw="flex items-center justify-between w-full h-full bg-primary-tint-3 lg:w-auto">
          <LogoWrap />
          <div tw="lg:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              distance="sm"
              size={30}
              rounded
              hideOutline={false}
              label="Abrir barra de navegación"
              color={`${theme<string>`colors.accent.555`}`}
            />
          </div>
        </div>
        <>
          <Overlay isOpen={isOpen} onClick={() => setOpen(false)} />
          <Nav
            style={navSpring}
            setHeight={setNavHeight}
            device="mobile"
            toggle={setOpen}
          />
          <Nav device="desktop" toggle={setOpen} />
        </>
      </>
    </Container>
  );
};

export default Header;
