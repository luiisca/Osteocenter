import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

import Heading from '../Heading';
import {ImgWrap} from './style';

const Text = styled.p((props) => [
  tw`text-lg font-medium leading-6`,
])

const Card = ({period, name, image, children}) => {
  return (
    <div>
      <ImgWrap>
        <Image
          src={`/img/icons/${image}.svg`}
          alt={`${name} icon`}
          layout='responsive'
          size='10vw'
          width='1'
          height='1' />
      </ImgWrap>
      <Heading subHeading>{period}</Heading>
      <Text tw='mb-2'>{name}</Text>
      <Text tw='text-sm'>{children}</Text>
    </div>
  )
}

export default Card
