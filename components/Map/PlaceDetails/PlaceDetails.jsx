import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {GoLocation} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';

import {useMapContext} from '../../../context/MapProvider';
import Photos from './Photos';
import Reviews from './Reviews';

import {Title, Rating, Separator} from './Elements';

const Container = styled.div(({open}) => [
  tw`w-full h-full overflow-x-hidden overflow-y-scroll text-sm transition-all bg-primary-tint-2`,
  open && tw`w-1/3`,
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
  if (Object.keys(place.details).length > 0) {
    return (
      <Container>
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
