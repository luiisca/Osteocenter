import Image from 'next/image';
import {useReducer} from 'react';
import tw, {css, styled} from 'twin.macro';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {Button} from '../../Elements';

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
const Carousel = styled.div(({crrPage}) => [
  tw`flex w-full gap-3 transition-all`,
  css`
    transform: translate(calc(${-crrPage}*(100% + 12px)));
  `,
])
const ImgWrap = styled.div`
  ${tw`overflow-hidden rounded-[9px]`}
  flex-shrink: 0;
  flex-basis: 100%;
`
const Title = tw.h4`text-lg`

const Photos = ({imgs}) => {
  const [page, dispatch] = useReducer(pagesReducer, 0)
  return (
    <Container>
      <Title>Photos</Title>
      {page != 0 && <Button type='icon' arrow onClick={() => dispatch({type: 'PREVIOUS_PAGE'})}><BsArrowLeft /></Button>}
      <Carousel crrPage={page}>
        {imgs.map((img) => (
          <ImgWrap>
            <Image
              src={img.getUrl()}
              layout='responsive'
              width='1'
              height='1' />
          </ImgWrap>
        ))}
      </Carousel>
      {page != (imgs.length + 1) && <Button type='icon' arrow onClick={() => dispatch({type: 'NEXT_PAGE'})}><BsArrowRight /></Button>}
    </Container>
  )
}

export default Photos
