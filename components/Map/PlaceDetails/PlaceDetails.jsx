import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {animated, useSpring} from 'react-spring';
import {GoLocation} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';

import {useMapContext} from '../../../context/MapProvider';
import Photos from './Photos';
import Reviews from './Reviews';

import {Title, Rating, Separator} from './Elements';

const Container = styled.div(({collapse}) => [
  tw`w-1/2 h-full overflow-x-hidden overflow-y-scroll text-sm bg-primary-tint-2`,
  css`
    animation-duration: 0.2s;
    animation-name: slidein;
  `,
  collapse && css`
    @keyframes slidein {
      from {
        transform: translate(0);
      }
      to {
        transform: translate(-100%);
      }
    }
  `,
  !collapse && css`
    @keyframes slidein {
      from {
        transform: translate(-100%);
        width: 0;
      }
      1% {
        transform: translate(0);
      }
      to {
        width: 35%;
      }
    }
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

const PlaceDetails = ({collapse}) => {
  const {place, dispatchPlace} = useMapContext();
  if (Object.keys(place.details).length > 0) {
    return (
      <Container collapse={collapse}>
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
    )
  }
}

export default PlaceDetails
