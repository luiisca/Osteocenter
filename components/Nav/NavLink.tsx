import {PageLink} from "../Elements"

interface Props {
  nextLink?: boolean
  destination: string
  children: React.ReactNode
}

const NavLink = ({nextLink, destination, children}: Props): JSX.Element => {
  return (
    <li><PageLink nextLink={nextLink} destination={destination}>{children}</PageLink></li>
  )
}

export default NavLink
