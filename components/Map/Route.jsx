import React, {useRef, useState, useCallback, useEffect} from 'react';
import tw, {css, styled} from 'twin.macro';
import {Marker, GoogleMap, DirectionsService, DirectionsRenderer, useGoogleMap, useJsApiLoader} from '@react-google-maps/api';

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

  if (!userLocation) {
    console.log('no UL');
    removeDirections();
  }


  if (userLocation) {
    console.log('UL');
    ref.current.directionsService = new google.maps.DirectionsService();
    ref.current.directionsRenderer = new google.maps.DirectionsRenderer();
    ref.current.directionsRenderer.setMap(map);

    const request = {
      origin: userLocation,
      destination: {lat: -12.1193972, lng: -77.0339762},
      travelMode: 'DRIVING',
    }

    ref.current.directionsService.route(request, function (result, status) {
      if (status == 'OK') {
        ref.current.directionsRenderer.setDirections(result)
      }
    })
  }

  return (
    <Marker position={{lat: -12.1193972, lng: -77.0339762}} />
  )
}

export default Route
