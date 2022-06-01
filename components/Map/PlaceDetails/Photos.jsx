import Image from 'next/image';
import {useReducer, useState} from 'react';
import tw, {css, styled} from 'twin.macro';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {Button} from '../../Elements';

import {Title} from './Elements';

const pagesReducer = (state, action) => {
  switch (action.type) {
    case 'PREVIOUS_PAGE':
      return state - 1;
    case 'NEXT_PAGE':
      return state + 1;
    default:
      return state;
  }
}

const Container = tw.div`w-full h-auto`
const CarContainer = styled.div(({showBttns}) => [
  tw`relative w-full`,
  css`
    button {
      display: ${showBttns ? 'flex' : 'none'};
    }
  `,
])
const Carousel = styled.div(({crrPage}) => [
  tw`flex w-full gap-4 transition-all`,
  css`
    transform: translate(calc(${-crrPage}*(100% + 16px)));
  `,
])
const ImgWrap = styled.div`
  ${tw`overflow-hidden rounded-[9px]`}
  flex-shrink: 0;
  flex-basis: 100%;
`
const ArrowButton = styled(Button)(({left, right}) => [
  tw`w-[40px] h-[40px] text-xl`,
  tw`absolute z-[1] top-1/2 translate-y-[-50%]`,
  left && tw`left-0 translate-x-[-25%]`,
  right && tw`right-0 translate-x-[25%]`,
])

const Photos = ({imgs}) => {
  const [page, dispatch] = useReducer(pagesReducer, 0)
  const [showCarBttns, setShowCarBttns] = useState(false)

  return (
    <Container>
      <Title>Photos</Title>
      <CarContainer
        onMouseEnter={() => setShowCarBttns(true)}
        onMouseLeave={() => setShowCarBttns(false)}
        showBttns={showCarBttns}>
        {page != 0 &&
          <ArrowButton type='icon' arrow left
            onClick={() => dispatch({type: 'PREVIOUS_PAGE'})}>
            <BsArrowLeft />
          </ArrowButton>}
        <Carousel crrPage={page}>
          {imgs.map((img) => (
            <ImgWrap>
              <Image
                src={img.getUrl()}
                layout='responsive'
                objectFit='cover'
                width='1'
                height='1' />
            </ImgWrap>
          ))}
        </Carousel>
        {page != (imgs.length + 1) &&
          <ArrowButton type='icon' arrow right
            onClick={() => dispatch({type: 'NEXT_PAGE'})}>
            <BsArrowRight />
          </ArrowButton>}
      </CarContainer>
    </Container>
  )
}

export default Photos
