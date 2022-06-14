import React, {useRef, useState, useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {Marker, useGoogleMap} from '@react-google-maps/api';
import {BUSINESS_LOCATION} from '../../static/js/constants';

import {useLocationContext} from '../../context/LocationProvider';
import MarkerContainer from './MarkerContainer';

const Route = () => {
  const {location} = useLocationContext();

  const map = useGoogleMap();
  const ref = useRef({
    directionsService: null,
    directionsRenderer: null,
  });

  const removeDirections = () => {
    ref.current.directionsRenderer?.setMap(null);
    ref.current.directionsRenderer?.setDirections({routes: []});
    console.log('removeDirections', ref.current)
  }
  const centerBusiness = () => {
    map.setCenter(BUSINESS_LOCATION)
    map.setZoom(16)
  }

  if (location.user && location.routeActive) {
    ref.current.directionsService = new google.maps.DirectionsService();
    const rendererOptions = {
      map: map,
      suppressMarkers: true,
    }
    ref.current.directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
    ref.current.directionsRenderer.setMap(map);

    const request = {
      origin: location.user,
      destination: BUSINESS_LOCATION,
      travelMode: 'DRIVING',
    }

    ref.current.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        ref.current.directionsRenderer.setDirections(result);
      }
    })
    return (
      <>
        <MarkerContainer position={location.user} userLocation />
        <MarkerContainer position={BUSINESS_LOCATION} />
      </>
    )
  } else {
    console.log('ROUTE REMOVED')
    removeDirections();
    centerBusiness();

    return (
      <MarkerContainer position={BUSINESS_LOCATION} />
    )
  }
}

export default React.memo(Route)
