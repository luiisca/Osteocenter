import React, { useRef, useEffect } from "react";
import tw, { styled } from "twin.macro";
import { Button } from "../Elements";
import NavLink from "./NavLink";
import { animated } from "react-spring";

import { LoginBttn } from "@/pages/platform/login";

// @ts-ignore
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
  toggle,
}: {
  setHeight?: any;
  style?: {};
  device: "mobile" | "desktop";
  toggle: any;
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
        <NavLink destination="#" toggle={toggle}>
          Servicios
        </NavLink>
        <NavLink destination="#" toggle={toggle}>
          Por que elegirnos?
        </NavLink>
        <NavLink destination="#" toggle={toggle}>
          Contáctanos
        </NavLink>
        <NavLink nextLink destination="/blog" toggle={toggle}>
          Blog
        </NavLink>

        <div tw="h-[1.2px] bg-[#e3e3e2] mt-5 mb-10 lg:hidden" />
        <li tw="pb-5 lg:pb-0" onClick={() => toggle(false)}>
          <Button elType="text" nav cta href="#">
            Reserva una cita
          </Button>
        </li>
        <LoginBttn />
      </StyledNavList>
    </Container>
  );
};
export default Nav;
