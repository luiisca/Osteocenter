import {useState, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {GoogleMap, LoadScript} from '@react-google-maps/api';

import {BaseContainer as Container} from '../BaseStyle';
import {Heading} from '../Elements';
// import Map from '../Map';


const render = (status) => {
  return <h1>{status}</h1>;
}
const StyleGoogleMap = {
  height: '100%',
}
const Map = styled.div(() => [
  tw`overflow-hidden my-0 mx-auto rounded-2xl w-[900px] h-[500px] transition-all`,
  css`
    box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
    &:hover {
      box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
    }
  `,
])

const Location = () => {
  return (
    <Container tw='text-center'>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>

      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} >
        <Map>
          <GoogleMap
            mapContainerStyle={StyleGoogleMap}
            zoom={14}
            center={{lat: -12.1193972, lng: -77.0339762}}>
          </GoogleMap>
        </Map>
      </LoadScript>
    </Container>
  )
}

export default Location
