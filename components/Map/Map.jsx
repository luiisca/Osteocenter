import React, {useState, useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {useSpring, animated, config} from 'react-spring'; import {GoogleMap, useJsApiLoader, useGoogleMap, Marker} from '@react-google-maps/api';

import {MdClose} from 'react-icons/md';
import {RiFullscreenExitFill, RiFullscreenFill} from 'react-icons/ri';

import MarkerContainer from './MarkerContainer';
import Route from './Route';
import PlaceDetails from './PlaceDetails';
import {BUSINESS_LOCATION, LIBRARIES} from '../../static/js/constants';
import {useMapContext} from '../../context/MapProvider';

import {Button} from '../Elements';

const HideBttn = styled(Button)(() => [
  tw`w-10 h-10`,
  tw`absolute top-3 z-[2]`,
  tw`text-lg`,
])

const Container = styled.div(({mapFullscreen}) => [
  tw`text-left`,
  tw`relative transition-all`,
  tw`overflow-hidden mx-auto my-0 rounded-2xl w-[900px] h-[500px]`,
  css`
    box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
    &:hover {
      box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
    }
    transform: ${mapFullscreen ? 'scale(1.7)' : 'scale(1)'};
  `,
])
const GoogleMapContainer = styled(animated.div)(() => [
  tw`w-full h-full`,
  tw`absolute top-0 left-0`,
  tw`inline-block`,
])
const FullscreenBttn = styled.div(({mapFullscreen}) => [
  tw`w-10 h-10 bg-white`,
  tw`absolute z-10 top-2 right-2`,
  tw`flex items-center justify-center`,
  tw`text-xl text-accent-555 hover:text-accent-333`,
  tw`rounded-[2px] cursor-pointer`,
  css`
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
    transform: ${mapFullscreen ? 'scale(0.7)' : 'scale(1)'};
  `,
])

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
  const {map, dispatchMap} = useMapContext();

  const mapSpring = useSpring({
    to: {
      left: map.open ? '35%' : '0%',
      width: map.open ? '65%' : '100%',
      overflow: 'hidden',
    },
    config: config.default
  })
  const hideBttnSpring = useSpring({
    to: {
      left: map.open ? '30%' : '-5%',
      opacity: map.open ? '1' : '0',
    },
    config: config.default
  })

  const renderMap = () => {
    return (
      <Container mapFullscreen={map.fullscreen}>
        <PlaceDetails />

        <HideBttn type='icon' style={hideBttnSpring}
          onClick={() => dispatchMap({type: 'HIDE'})}>
          <MdClose />
        </HideBttn>

        <GoogleMapContainer style={mapSpring}>
          <GoogleMap
            zoom={14}
            center={BUSINESS_LOCATION}
            clickableIcons={false}
            options={{
              fullscreenControl: false,
            }}
            mapContainerStyle={{
              height: '100%',
              width: '100%',
            }}
          >
            <MarkerContainer />
            <Route
              userLocation={userLocation}
            />
            <DetailsGetter dispatch={dispatchMap} />
          </GoogleMap>
          <FullscreenBttn onClick={() => dispatchMap({type: 'MAP_FULLSCREEN'})} mapFullscreen={map.fullscreen}>
            {map.fullscreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
          </FullscreenBttn>
        </GoogleMapContainer>
      </Container >
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

