import {useState, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {Wrapper, Status} from '@googlemaps/react-wrapper';

import {BaseContainer as Container} from '../BaseStyle';
import {Heading} from '../Elements';
// import Map from '../Map';


const render = (status) => {
  return <h1>{status}</h1>;
}

const Location = () => {
  return (
    <Container tw='text-center'>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>

      <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} render={render}>
        <Map
          zoom={14}
          center={{lat: -12.1193972, lng: -77.0339762}}>
        </Map>
      </Wrapper>
    </Container>
  )
}

export default Location
