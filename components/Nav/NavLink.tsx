import tw, { styled } from "twin.macro";
import { PageLink } from "../Elements";
import { BaseLink } from "../../components/BaseStyle";

export const StyledNavLink = styled(BaseLink)(() => [
  tw`text-base font-medium`,
  tw`w-full py-5`,
  tw`lg:px-5 lg:w-auto`,
]);

interface Props {
  nextLink?: boolean;
  destination?: string;
  children: React.ReactNode;
  toggle: any;
}

const NavLink = ({
  nextLink,
  destination,
  children,
  toggle,
}: Props): JSX.Element => {
  if (!destination?.includes("/")) {
    return (
      <StyledNavLink href={destination} onClick={() => toggle(false)}>
        {children}
      </StyledNavLink>
    );
  }

  return (
    <li>
      <PageLink nextLink={nextLink} destination={destination} custom>
        <StyledNavLink onClick={() => toggle(false)}>{children}</StyledNavLink>
      </PageLink>
    </li>
  );
};

export default NavLink;
