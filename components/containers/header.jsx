import Button from '../Button';

const Header = () => {
  return (
    <header class="header">
      <a href="#">
        <img class="logo" alt="osteocenter logo" src="img/osteocenter-logo.png" />
      </a>
      <nav>
        <ul class="main-nav-list">
          <li><a class="main-nav-link" href="#">Nuestros Servicios</a></li>
          <li><a class="main-nav-link" href="#">Por que elegirnos?</a></li>
          <li><a class="main-nav-link" href="#">Contáctanos</a></li>
          <li><a class="main-nav-link" href="#">Blog</a></li>
          <li>
            <a href="" class="main-nav-link nav-cta">Pide una cita</a>
          </li>

        </ul>
      </nav>
    </header>
  )
}

export default Header;
