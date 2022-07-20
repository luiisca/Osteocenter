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
}

const NavLink = ({ nextLink, destination, children }: Props): JSX.Element => {
  if (!destination?.includes("/")) {
    return <StyledNavLink href={destination}>{children}</StyledNavLink>;
  }

  return (
    <li>
      <PageLink nextLink={nextLink} destination={destination} custom>
        <StyledNavLink>{children}</StyledNavLink>
      </PageLink>
    </li>
  );
};

export default NavLink;
