import React, {useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {GoogleMap, Marker, useGoogleMap, useJsApiLoader} from '@react-google-maps/api';

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

const Map = () => {
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const onLoad = useCallback((map) => {
    // console.log(map)
  })
  const onMarkerLoad = console.log

  const renderMap = () => {
    return (
      <Container>
        <GoogleMap
          zoom={14}
          center={{lat: -12.1193972, lng: -77.0339762}}
          onLoad={onLoad}
          mapContainerStyle={StyleGoogleMap}>
          <Marker
            label='hello!'
            position={{lat: -12.1193972, lng: -77.0339762}}
          />
        </GoogleMap>
      </Container>
    )
  }

  if (loadError) {
    return <p>Map cannot be loaded</p>
  }

  return (
    isLoaded ? renderMap() : <Spinner />
  )
}

export default React.memo(Map)
