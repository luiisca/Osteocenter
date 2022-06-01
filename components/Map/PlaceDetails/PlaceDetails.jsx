import Image from 'next/image';
import {Fragment, useRef} from 'react';
import tw, {css, styled} from 'twin.macro';
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

  tw`text-sm bg-primary-tint-2`,
  tw`overflow-x-hidden overflow-y-scroll`,
])
const OpenBttn = styled(Button)(() => [
  tw`w-[25px]`,
  tw`absolute top-1/2 left-[35%] z-[1]`,
  tw`rounded-none`,
  tw`rounded-r-sm`,
  css`
    transform: translate(0, -50%);
  `
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

const PlaceDetails = () => {
  const {place, dispatchPlace} = useMapContext();
  const containerRef = useRef()

  const detailsSpring = useSpring({
    to: {
      opacity: place.invisible && 0,
      transform: place.open ? 'translate(0%)' : 'translate(-100%)',
    },
    config: config.default
  })
  const openBttnSpring = useSpring({
    to: {
      left: place.open ? '35%' : '0%',
    },
    config: config.gentle
  })

  if (Object.keys(place.details).length > 0) {
    return (
      <Fragment>
        <Container style={detailsSpring} ref={containerRef}>
          <ImgWrap>
            <Image
              src={place.details.photos[0].getUrl()}
              alt={place.details.name}
              layout='fill'
              objectFit='cover'
            />
          </ImgWrap>
          <ContentWrap>
            <Title main>{place.details.name}</Title>
            <Rating score={place.details.rating} qtt={place.details.user_ratings_total} />
          </ContentWrap>


          <ContentWrap>
            <Separator tw='mb-4' />
            <Flex icon tw='mb-3'>
              <GoLocation />
              <p>{place.details.vicinity}</p>
            </Flex>
            <Flex icon>
              <BsClock />
              <p>{place.details.opening_hours.isOpen() ? 'Abierto' : 'Cerrado'}</p>
            </Flex>
            <Separator tw='mt-4' />
          </ContentWrap>


          <ContentWrap>
            <Photos imgs={place.details.photos.slice(1)} />
          </ContentWrap>
          <ContentWrap>
            <Reviews reviews={place.details.reviews} />
          </ContentWrap>
          {console.log('PlaceDetails/>', place)}
        </Container>

        {place.openBttn &&
          <OpenBttn type='icon' style={openBttnSpring}
            onClick={() => dispatchPlace({type: 'TOGGLE_OPEN'})}>
            <MdArrowLeft />
          </OpenBttn>
        }
      </Fragment>
    )
  }
}

export default PlaceDetails
