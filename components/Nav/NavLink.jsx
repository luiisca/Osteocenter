import Link from 'next/link';

import tw, {css, styled} from 'twin.macro';
import {BaseLink} from '../BaseStyle';

const StyledNavLink = styled(BaseLink)(props => [
  tw`text-lg font-medium`,
])

const NavLink = ({nextLink, destination, children}) => {
  return (
    nextLink ? (
      <li>
        <Link href={destination} passHref>
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
