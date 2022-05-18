import {PageLink} from "../Elements"

const NavLink = ({nextLink, destination, children}) => {
  return (
    <li><PageLink nextLink={nextLink} destination={destination}>{children}</PageLink></li>
  )
}

export default NavLink
