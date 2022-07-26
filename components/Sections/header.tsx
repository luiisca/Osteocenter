import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Turn as Hamburger } from "hamburger-react";
import { useSpring, animated } from "react-spring";
import { useScroll } from "framer-motion";

import tw, { styled } from "twin.macro";
import Nav from "../Nav";

const Container = styled(animated.header)(() => [
  tw`sticky top-0 z-30 flex items-center justify-between h-24 px-12 bg-primary-tint-3 shadow-sm`,
]);

const Logo = tw.a`block relative min-w-[200px] h-full`;

const Overlay = styled.div(({ isOpen }: { isOpen: boolean }) => [
  tw`left-0 absolute z-[-1] w-screen h-screen top-full bg-transparent`,
  !isOpen && tw`hidden`,
]);

const LogoWrap = () => (
  <Link href="/" passHref>
    <Logo>
      <Image
        priority={true}
        layout="fill"
        objectFit="contain"
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
        <div className="flex items-center justify-between w-full h-full bg-primary-tint-3 lg:w-auto">
          <LogoWrap />
          <div className="lg:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              direction="right"
              rounded
              hideOutline={false}
              label="Abrir barra de navegación"
            />
          </div>
        </div>
        <>
          <Overlay isOpen={isOpen} onClick={() => setOpen(false)} />
          <Nav style={navSpring} setHeight={setNavHeight} device="mobile" />
          <Nav device="desktop" />
        </>
      </>
    </Container>
  );
};

export default Header;
