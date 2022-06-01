import PageLink from "../PageLink"
const NavLink = ({nextLink, destination, children}) => {
  return (
    <li><PageLink nextLink={nextLink} destination={destination}>{children}</PageLink></li>
  )
}

export default NavLink
