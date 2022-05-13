import Link from 'next/link';

import tw, {css, styled} from 'twin.macro';
import StyledLink from '../BaseStyle/StyledLink';

const StyledNavLink = styled(StyledLink)(props => [
  tw`text-lg font-medium`,
])

const NavLink = ({nextLink, destination, children}) => {
  return (
    nextLink ? (
      <li>
        <Link href={destination}>
          <StyledNavLink>{children}</StyledNavLink>
        </Link>
      </li>
    ) : (
      <li>
        <StyledNavLink href={destination}>{children}</StyledNavLink>
      </li>
    )
  )
}

export default NavLink
