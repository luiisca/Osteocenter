import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';

import {Heading} from '../Elements';

const Container = tw.div`flex flex-col items-center`
const ImgWrap = styled.div`
    ${tw`relative max-w-[5rem]`}
    &::before {
      content: '';
      ${tw`block absolute top-[20%] z-[-1] w-4/5 h-4/5 bg-no-repeat bg-contain`}
      background-image: url('../../static/img/shapes/${props => props.position}-bubble.png');
    }
  `
const Text = tw.p`text-lg max-w-[30ch]`

const Value = ({name, shapePosition}) => {
  return (
    <Container>
      <ImgWrap position={shapePosition} tw='mb-8'>
        <Image
          src={`/img/icons/${name}.svg`}
          alt={`${name} logo`}
          layout='raw'
          size='10vw'
          width='500'
          height='500'
        />
      </ImgWrap>
      <Heading as='h3' tertiary tw='mb-4 font-sans'>
        <span>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</span>
      </Heading>
      <Text>
        lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
    </Container >
  )
}

export default Value
