import tw, {styled, css, theme} from 'twin.macro';

import Image from 'next/image';
import {useReducer} from 'react';
import {useSpring, animated} from 'react-spring';
import {uuid} from 'uuidv4'

import {BsArrowLeft, BsArrowRight} from 'react-icons/bs';

import {BaseContainer, BaseLink} from '../BaseStyle';
import {Button, Heading, PageLink} from '../Elements';
import {ARTICLES_PER_PAGE} from '../../static/ts/constants';

const Container = styled(BaseContainer)(() => [
  tw`flex gap-6`,
  css`
    height: clamp(350px, 15vh, 400px);
  `,
])
const Flex = tw.div`flex gap-3`
const WrapLink = styled(BaseLink)(() => [
  tw`leading-7`,
  css`
    &:link, &:visited {
      ${tw`text-primary`}
      border-bottom: solid 2px ${theme<string>`colors.primary`}
    }
    &:hover, &:active {
      ${tw`text-primary-shade-1`}
      border-color: ${theme<string>`colors.primary.shade-1`}
    }
  `,
])
const CarouselWrap = tw.div`overflow-hidden`
const Carousel = styled(animated.div)(() => [
  tw`flex w-full h-full`,
])
const Article = styled.div(() => [
  tw`flex flex-col h-full min-w-[50%] pl-7`,
  css`
    flex-shrink: 0;
  `,
])
const ImgWrap = tw.div`w-full h-full relative`

const initialState = {
  articles: [{
    title: 'Article 1',
    type: 'Caso de estudio',
    picture: 'article1.jpg',
  },
  {
    title: 'Article 2',
    type: 'Tratamiento',
    picture: 'article2.jpg',
  },
  {
    title: 'Article 3',
    type: 'Caso de estudio',
    picture: 'article3.jpg',
  },
  {
    title: 'Article 4',
    type: 'Prevención',
    picture: 'article4.jpg',
  }],
  page: 0
}
type ACTIONTYPE = {type: 'PREVIOUS'} | {type: 'NEXT'}

const articlesOrderReducer = (state: typeof initialState, action: ACTIONTYPE): typeof initialState => {
  switch (action.type) {
    case 'PREVIOUS':
      // state.articles.unshift(state.articles.pop())
      return {...state, page: state.page - 1}
    case 'NEXT':
      // state.articles.push(state.articles.shift())
      return {...state, page: state.page + 1}
    default:
      return state
  }
}


const Articles = (): JSX.Element => {
  const [data, dispatch] = useReducer(articlesOrderReducer, initialState)
  const carouselSpring = useSpring({
    transform: `translate(${-data.page * 50}%)`
  })

  return (
    <Container>
      <div>
        <Heading subHeading as='span'>Artículos</Heading>
        <Heading secondary as='h2' tw='max-w-[15ch] mb-6'>Lo último de Osteocenter</Heading>
        <PageLink nextLink custom destination='/blog'>
          <WrapLink tw='mb-5'>Ver todos</WrapLink>
        </PageLink>
        <Flex>
          <Button
            elType='icon'
            inactive={data.page == 0}
            onClick={() => data.page == 0 || dispatch({type: 'PREVIOUS'})}
          >
            <BsArrowLeft />
          </Button>
          <Button
            elType='icon'
            inactive={data.page == data.articles.length / ARTICLES_PER_PAGE}
            onClick={() => data.page == data.articles.length / ARTICLES_PER_PAGE || dispatch({type: 'NEXT'})}
          >
            <BsArrowRight />
          </Button>
        </Flex>
      </div>
      <CarouselWrap>
        <Carousel style={carouselSpring}>
          {data.articles.map((article, i) => (
            <Article key={uuid()}>
              <ImgWrap tw='mb-4'>
                <Image
                  src={`/img/articles/${article.picture}`}
                  alt={article.title}
                  layout='fill'
                  objectFit='cover'
                />
              </ImgWrap>
              <Heading subHeading as='span' tw='text-xs'>{article.type}</Heading>
              <Heading secondary as='h2' tw='m-0 text-4xl'>{article.title}</Heading>
            </Article>
          ))}
        </Carousel>
      </CarouselWrap>
    </Container>
  )
}

export default Articles
