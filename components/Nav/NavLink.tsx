import {PageLink} from "../Elements"

interface NavLink {
  nextLink?: boolean
  destination: string
  children: React.ReactNode
}

const NavLink = ({nextLink, destination, children}: NavLink):JSX.Element => {
  return (
    <li><PageLink nextLink={nextLink} destination={destination}>{children}</PageLink></li>
  )
}

export default NavLink
