import tw, {css, styled} from 'twin.macro';
import {Wrapper, Status} from '@googlemaps/react-wrapper';

import {BaseContainer as Container} from '../BaseStyle';
import {Heading} from '../Elements';
import Map from '../Map';


const render = (status) => {
  return <h1>{status}</h1>;
}

const Location = () => {
  return (
    <Container>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>

      <Wrapper apiKey='AIzaSyATQKlSB3bz3ac3aTfjScdloRBZkjOxjBw' render={render}>
        <Map
          zoom={14}
          center={{lat: -12.1193972, lng: -77.0339762}} />
      </Wrapper>
    </Container>
  )
}

export default Location
