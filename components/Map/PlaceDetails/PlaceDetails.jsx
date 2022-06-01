import Image from 'next/image';
import tw, {css, styled} from 'twin.macro';
import {GoLocation} from 'react-icons/go';
import {BsClock} from 'react-icons/bs';

import {useMapContext} from '../../../context/MapProvider';
import Rating from './Rating';
import Photos from './Photos';
import Reviews from './Reviews';

const Container = styled.div(({open}) => [
  tw`w-full h-full overflow-x-hidden overflow-y-scroll transition-all bg-primary`,
  tw`p-3`,
  open && tw`w-1/3`,
])
const Separator = styled.div`
  height: 0px;
  border-bottom: 1px solid #e8eaed;
`

const ImgWrap = tw.div`relative w-full h-1/5`
const Title = tw.h4`text-lg`
const Adress = tw.div`flex gap-4 my-3`
const Opening = tw.div`flex gap-4 my-3`


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
        <Title>{place.details.name}</Title>
        <Rating />

        <Separator />

        <Adress>
          <GoLocation />
          <p>{place.details.vicinity}</p>
        </Adress>
        <Opening>
          <BsClock />
          <p>{place.details.opening_hours.isOpen() ? 'Abierto' : 'Cerrado'}</p>
        </Opening>

        <Separator />

        <Photos imgs={place.details.photos.slice(1)} />
        <Reviews reviews={place.details.reviews} />
        {console.log('PlaceDetails/>', place)}
      </Container>
    )
  }
}

export default PlaceDetails
