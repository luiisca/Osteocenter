import Image from 'next/image';
import {Fragment} from 'react';
import tw, {css, styled} from 'twin.macro'; ;
import {animated, useSpring, config} from 'react-spring';

import {GoLocation} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';
import {MdArrowLeft, MdArrowRight} from 'react-icons/md';

import {useMapContext} from '../../../context/MapProvider';

import Photos from './Photos';
import Reviews from './Reviews';
import {Button} from '../../Elements';
import {Title, Rating, Separator} from './Elements';

const Container = styled(animated.div)(() => [
  tw`w-[35%] h-full`,
  tw`absolute z-[1] inline-block opacity-100`,
  tw`overflow-x-hidden`,

  tw`text-sm bg-primary-tint-2`,
])

const OpenBttnContainer = styled(animated.div)(() => [
  tw`w-[40px] h-[80px]`,
  tw`flex items-center justify-items-start`,
  tw`absolute top-1/2 left-[35%] z-20`,
  tw`hover:cursor-pointer`,

  css`
    transform: translate(0, -50%);
  `
])
const OpenBttn = styled(Button)(() => [
  tw`w-[25px]`,
  tw`rounded-none rounded-r-sm`,
])

const ContentWrap = tw.div`py-3 px-4`

const ImgWrap = tw.div`relative w-full h-2/5`
const Flex = styled.div((props) => [
  tw`flex items-center gap-4`,
  props.icon && css`
    ${tw`text-accent-333`};
    svg {
      flex-shrink: 0;
      ${tw`text-xl`}
      ${tw`text-primary-shade-2 stroke-[2%]`}
    }
  `,
])

const PlaceDetails = (): JSX.Element | null => {
  const {map, dispatchMap} = useMapContext();
  console.log(map);

  const detailsSpring = useSpring({
    to: {
      opacity: map.invisible && 0,
      transform: map.open ? 'translate(0%)' : 'translate(-100%)',
    },
    config: config.default
  })
  const openBttnSpring = useSpring({
    to: {
      left: map.open ? '35%' : '0%',
    },
    config: config.default
  })

  const loader = ({src, quality}) => {
    return `${src}&q=${quality || 75}`
  }

  if (Object.keys(map.details).length > 0) {
    return (
      <Fragment>
        <Container style={detailsSpring}>
          <ImgWrap>
            <Image
              loader={loader}
              src={map.details.photos[0].getUrl()}
              alt={map.details.name}
              layout='fill'
              objectFit='cover'
            />
          </ImgWrap>
          <ContentWrap>
            <Title main>{map.details.name}</Title>
            <Rating score={map.details.rating} qtt={map.details.user_ratings_total} />
          </ContentWrap>

          <ContentWrap>
            <Separator tw='mb-4' />
            <Flex icon tw='mb-3'>
              <GoLocation />
              <p>{map.details.vicinity}</p>
            </Flex>
            <Flex icon>
              <BsClock />
              <p>{map.details.opening_hours.isOpen() ? 'Abierto' : 'Cerrado'}</p>
            </Flex>
            <Separator tw='mt-4' />
          </ContentWrap>

          <ContentWrap>
            <Photos imgs={map.details.photos.slice(1)} />
          </ContentWrap>
          <ContentWrap>
            <Reviews reviews={map.details.reviews} />
          </ContentWrap>
        </Container>

        {map.openBttn &&
          <OpenBttnContainer style={openBttnSpring}
            onClick={() => dispatchMap({type: 'TOGGLE_OPEN'})}>
            <OpenBttn type='icon'>
              {map.open ? <MdArrowLeft /> : <MdArrowRight />}
            </OpenBttn>
          </OpenBttnContainer>
        }
      </Fragment>
    )
  } else return null
}

export default PlaceDetails
