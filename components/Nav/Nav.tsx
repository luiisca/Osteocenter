import React, { useRef, useEffect } from "react";
import tw, { styled } from "twin.macro";
import { Button } from "../Elements";
import NavLink from "./NavLink";
import { animated } from "react-spring";

const Container = styled(animated.nav)(() => [
  tw`z-10 w-full p-4 list-none bg-primary-tint-3`,
  tw`lg:w-auto`,
]);
const StyledNavList = styled.ul(() => [
  tw`flex flex-col list-none`,
  tw`lg:flex-row lg:items-center lg:gap-8`,
]);

const Nav = ({
  setHeight,
  style,
}: {
  setHeight?: any;
  style?: {};
}): JSX.Element => {
  const navRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (setHeight) {
      setHeight(navRef?.current?.clientHeight || 0);
    }
  }, [navRef?.current?.clientHeight, setHeight]);

  return (
    <Container style={style} ref={navRef}>
      <StyledNavList>
        <NavLink destination="#">Nuestros Servicios</NavLink>
        <NavLink destination="#">Por que elegirnos?</NavLink>
        <NavLink destination="#">Contáctanos</NavLink>
        <NavLink nextLink destination="/blog">
          Blog
        </NavLink>

        <li>
          <Button elType="text" nav cta href="#">
            Pide una cita
          </Button>
        </li>
      </StyledNavList>
    </Container>
  );
};
export default Nav;
