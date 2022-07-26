import React, { useRef, useEffect } from "react";
import tw, { styled } from "twin.macro";
import { Button } from "../Elements";
import NavLink from "./NavLink";
import { animated } from "react-spring";

const Container = styled(animated.nav)(
  ({ device }: { device: "mobile" | "desktop" }) => [
    tw`w-full px-8 pb-5 list-none bg-primary-tint-3 shadow-sm z-[-1]`,
    tw`lg:relative lg:w-auto lg:p-0 lg:h-24 lg:shadow-none lg:z-10`,

    device === "mobile" && tw`lg:hidden`,
    device === "desktop" && tw`hidden lg:flex`,
  ]
);
const StyledNavList = styled.ul(() => [
  tw`flex flex-col list-none`,
  tw`lg:flex-row lg:items-center`,
]);

const Nav = ({
  setHeight,
  style,
  device,
}: {
  setHeight?: any;
  style?: {};
  device: "mobile" | "desktop";
}): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (setHeight) {
      setHeight(navRef?.current?.clientHeight || 0);
    }
  }, [navRef?.current?.clientHeight, setHeight]);

  return (
    <Container ref={navRef} style={style} device={device}>
      <StyledNavList>
        <NavLink destination="#">Servicios</NavLink>
        <NavLink destination="#">Por que elegirnos?</NavLink>
        <NavLink destination="#">Contáctanos</NavLink>
        <NavLink nextLink destination="/blog">
          Blog
        </NavLink>

        <div className="h-[1.2px] bg-[#e3e3e2] mt-5 mb-10 lg:hidden" />
        <li className="pb-5 lg:pb-0">
          <Button elType="text" nav cta href="#">
            Pide una cita
          </Button>
        </li>
        <NavLink>Entrar</NavLink>
      </StyledNavList>
    </Container>
  );
};
export default Nav;
