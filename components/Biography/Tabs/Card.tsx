import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';;

import {Heading} from '../../Elements';
import {ImgWrap} from '../style';

interface Props {
  period: string
  name: string
  image: string
  children: React.ReactNode
}

const Text = styled.p(() => [
  tw`text-lg font-medium leading-6`,
])

const Card = ({period, name, image, children}: Props) => {
  return (
    <div>
      <ImgWrap>
        <Image
          src={`/img/icons/${image}.svg`}
          alt={`${name} icon`}
          layout='responsive'
          sizes='10vw'
          width='1'
          height='1'
        />
      </ImgWrap>
      <Heading subHeading>{period}</Heading>
      <Text tw='mb-2'>{name}</Text>
      <Text tw='text-sm'>{children}</Text>
    </div>
  )
}

export default Card
