import React, {useState, useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {Marker, GoogleMap, DirectionsService, DirectionsRenderer, useGoogleMap, useJsApiLoader} from '@react-google-maps/api';

import Route from './Route';
import {BUSINESS_LOCATION} from '../../static/js/constants';

const Container = styled.div(() => [
  tw`overflow-hidden my-0 mx-auto rounded-2xl w-[900px] h-[500px] transition-all`,
  css`
    box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
    &:hover {
      box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
    }
  `,
])

const StyleGoogleMap = {
  height: '100%',
}

const Spinner = () => {
  return (
    <h1>Loading...</h1>
  )
}

const Test = () => {
  const map = useGoogleMap()
  useEffect(() => {
    console.log('useGoogleMap', map)
  }, [map])

  return null
}

const Map = ({userLocation}) => {
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const onLoad = useCallback((map) => {
    // console.log(map);
  })
  const onMarkerLoad = console.log


  const renderMap = () => {
    return (
      <Container>
        <GoogleMap
          zoom={14}
          center={BUSINESS_LOCATION}
          onLoad={onLoad}
          mapContainerStyle={StyleGoogleMap}
        >
          <Route userLocation={userLocation} />
        </GoogleMap>
      </Container>
    )
  }

  if (loadError) {
    return <p>Map cannot be loaded</p>
  }

  return (
    // cause useJsApiLoader is async
    isLoaded ? renderMap() : <Spinner />
  )
}

export default React.memo(Map)

