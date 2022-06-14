import tw, {css, styled} from 'twin.macro';

import Map from '../Map';
import Button from './Button';
import {BaseContainer} from '../BaseStyle';
import {Heading} from '../Elements';

import useIsMobile from '../../hooks/useIsMobile';
import MapProvider from '../../context/MapProvider';

const Location = () => {
  const IS_MOBILE = useIsMobile();

  return (
    <BaseContainer tw='text-center'>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>

      <MapProvider>
        <Map />
      </MapProvider>

      <Button mobile={IS_MOBILE} />

      <h1>{IS_MOBILE ? 'It is Mobile' : 'It is not Mobile'}</h1>
    </BaseContainer>
  )
}

export default Location
