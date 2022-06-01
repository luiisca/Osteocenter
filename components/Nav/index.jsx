import tw, {css, styled} from 'twin.macro';
import StyledList from '../BaseStyle/StyledList';
import Button from '../Button';
import NavLink from './NavLink';

const NavList = tw(StyledList)`flex items-center gap-8`

const Nav = () => {
  return (
    <nav>
      <NavList>
        <NavLink destination={'#'}>Nuestros Servicios</NavLink>
        <NavLink destination={'#'}>Por que elegirnos?</NavLink>
        <NavLink destination={'#'}>Contáctanos</NavLink>
        <NavLink nextLink destination={'/blog'}>Blog</NavLink>
        <li><Button href='#'>Pide una cita</Button></li>
      </NavList>
    </nav>
  )
}

export default Nav
