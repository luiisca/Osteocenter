import tw, {css, styled} from 'twin.macro';
import {BaseList} from '../BaseStyle';
import {Button} from '../Elements';
import NavLink from './NavLink';

const StyledNavList = tw(BaseList)`flex items-center gap-8`

const Nav = (): JSX.Element => {
  return (
    <nav>
      <StyledNavList>
        <NavLink destination='#'>Nuestros Servicios</NavLink>
        <NavLink destination='#'>Por que elegirnos?</NavLink>
        <NavLink destination='#'>Contáctanos</NavLink>
        <NavLink nextLink destination='/blog'>Blog</NavLink>
        <li><Button elType='text' nav cta href='#'>Pide una cita</Button></li>
      </StyledNavList>
    </nav>
  )
}

export default Nav
