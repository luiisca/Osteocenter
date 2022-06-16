import Link from 'next/link';
import Image from 'next/image';

import tw, {css, styled} from 'twin.macro';
import Nav from '../Nav';

const Container = tw.header`flex justify-between items-center bg-primary-tint-3 h-24 px-12`
const StyleImgContainer = tw.a`block relative min-w-[200px] h-full`

const Header = (): JSX.Element => {
  return (
    <Container>
      <Link href='/' passHref>
        <StyleImgContainer>
          <Image
            priority={true}
            layout='fill'
            objectFit='contain'
            alt="osteocenter logo"
            src="/img/osteocenter-logo.png" />
        </StyleImgContainer>
      </Link>
      <Nav />
    </Container>
  )
}

export default Header;
