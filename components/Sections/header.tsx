import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Turn as Hamburger } from "hamburger-react";
import { useSpring, animated } from "react-spring";

import tw, { styled, css } from "twin.macro";
import Nav from "../Nav";

const Container = styled.header(() => [
  tw`relative z-30 flex items-center justify-between h-24 px-12 bg-primary-tint-3`,
]);

const Logo = tw.a`block relative min-w-[200px] h-full`;

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
const Overlay = styled.div(({ headerHeight }: { headerHeight: number }) => [
  tw`absolute z-10 w-screen h-screen bg-transparent`,
  css`
    top: ${headerHeight}px;
  `,
]);

const Header = (): JSX.Element => {
  const [screenWidth, setScreenWidth] = useState<number>(1023);
  const [isOpen, setOpen] = useState<boolean>(undefined as unknown as boolean);
  const [navHeight, setNavHeight] = useState<number>(0);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHeaderHeight(headerRef?.current?.clientHeight || 0);
  }, [headerRef?.current?.clientHeight, setHeaderHeight]);

  const navSpring = useSpring({
    position: "absolute",
    left: 0,
    top: isOpen ? `${headerHeight}px` : `-${navHeight - headerHeight}px`,
  });

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    if (window.innerWidth >= 1024) {
      setOpen(undefined as unknown as boolean);
    } else setOpen(false);

    const setWidth = () => {
      setScreenWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setOpen(undefined as unknown as boolean);
      } else setOpen(false);
    };
    window.addEventListener("resize", setWidth);

    return () => window.removeEventListener("resize", setWidth);
  }, []);

  return (
    <>
      <Container ref={headerRef}>
        {screenWidth < 1024 ? (
          <>
            <LogoWrap />
            {typeof isOpen === "boolean" && (
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                direction="right"
                rounded
                hideOutline={false}
                label="Abrir barra de navegación"
              />
            )}
          </>
        ) : (
          <>
            <LogoWrap />
            <Nav />
          </>
        )}
      </Container>
      {screenWidth < 1024 && (
        <>
          <Overlay headerHeight={headerHeight} onClick={() => setOpen(false)} />
          <Nav style={navSpring} setHeight={setNavHeight} />
        </>
      )}
    </>
  );
};

export default Header;
