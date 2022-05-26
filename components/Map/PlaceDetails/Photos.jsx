import Image from 'next/image';
import {useReducer} from 'react';
import tw, {css, styled} from 'twin.macro';
import {BsArrowRight, BsArrowLeft} from 'react-icons/bs';

import {Button} from '../../Elements';

const pagesReducer = (state, action) => {
  switch (action.type) {
    case 'PREVIOUS_PAGE':
      if (state == 0) return state - 1;
      return -(state - 1);
    case 'NEXT_PAGE':
      return state + 1;
    default:
      return state;
  }
}

const Container = tw.div`w-full h-1/5`
const Carousel = styled.div(({crrPage}) => [
  tw`flex w-full h-full transition-all`,
  css`
    transform: translate(${crrPage * 100}%)
  `,
])
const ImgWrap = tw.div`w-full h-full rounded-[9px]`
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
