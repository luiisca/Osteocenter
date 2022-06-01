import React, {useState, useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {GoogleMap, useJsApiLoader, useGoogleMap} from '@react-google-maps/api';

import Route from './Route';
import PlaceDetails from './PlaceDetails';
import {BUSINESS_LOCATION, LIBRARIES} from '../../static/js/constants';
import {useMapContext} from '../../context/MapProvider';

const Container = styled.div(() => [
  tw`grid grid-cols-[30% auto]`,
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
  width: '100%',
}

const Spinner = () => {
  return (
    <h1>Loading...</h1>
  )
}

const DetailsGetter = ({dispatch}) => {
  console.log('DETAILS RUNNED');
  const map = useGoogleMap();
  useEffect(() => {
    const service = new google.maps.places.PlacesService(map);
    const fieldsTest = ['icon', 'icon_mask_base_uri', 'icon_background_color']
    const request = {
      placeId: 'ChIJnzhbFSTIBZERdvxWvPnibdE',
      fields: ['name', 'rating', 'user_ratings_total', 'type', 'vicinity', 'opening_hours', 'photos', 'reviews', 'url', ...fieldsTest]
    };
    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log('DETAILS GETTER', place);
        dispatch({type: 'STORE_DETAILS', details: place});
      }
    });
  }, [])

  return null;
}

const Map = ({userLocation}) => {
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES,
  });
  const {place, dispatchPlace} = useMapContext();

  const renderMap = () => {
    return (
      <Container>
        {/* let's see how many times it rerenders */}
        {/* if it's too much then memoize */}
        <PlaceDetails>Hello mom</PlaceDetails>
        <GoogleMap
          zoom={14}
          center={BUSINESS_LOCATION}
          mapContainerStyle={StyleGoogleMap}
        >
          <Route
            userLocation={userLocation}
          />

          <DetailsGetter dispatch={dispatchPlace} />
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

