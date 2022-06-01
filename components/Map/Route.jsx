import React, {useRef, useState, useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {Marker, GoogleMap, DirectionsService, DirectionsRenderer, useGoogleMap, useJsApiLoader} from '@react-google-maps/api';
import {BUSINESS_LOCATION} from '../../static/js/constants';

const Route = ({userLocation}) => {
  const map = useGoogleMap();
  const ref = useRef({
    directionsService: null,
    directionsRenderer: null,
  });
  const [directionsResult, setDirectionsResult] = useState(null)

  const directionsCallback = (response) => {
    if (response?.status == 'OK') {
      setDirectionsResult(response)
      console.log(response)
    }
  }

  const removeDirections = () => {
    ref.current.directionsRenderer?.setMap(null);
    ref.current.directionsRenderer?.setDirections({routes: []});
    console.log('REMOVED')
  }

  if (userLocation) {
    ref.current.directionsService = new google.maps.DirectionsService();
    ref.current.directionsRenderer = new google.maps.DirectionsRenderer();
    ref.current.directionsRenderer.setMap(map);

    const request = {
      origin: userLocation,
      destination: BUSINESS_LOCATION,
      travelMode: 'DRIVING',
    }

    ref.current.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        console.log(result);
        ref.current.directionsRenderer.setDirections(result);
      }
    })
  } else {
    removeDirections();
    return (
      <Marker position={{lat: -12.1193972, lng: -77.0339762}} />
    )
  }
}

export default Route
