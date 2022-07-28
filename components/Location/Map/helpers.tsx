import {useEffect} from 'react';
import {useGoogleMap} from '@react-google-maps/api';

import {PLACE_ID, PLACE_FIELDS} from '@/static/ts/constants';
import {useMapContext} from '../MapProvider';

interface Request {
  placeId: string
  fields: string[]
}

let map: google.maps.Map | HTMLDivElement
let service: google.maps.places.PlacesService
let request: Request

export const getUserLocation = (): Promise<google.maps.LatLngLiteral> => {
  return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(pos)
          },
          () => reject('Error: the location service failed')
      );
    } else {
      reject("Error: your browser doesn't support geolocation");
    }
  })
}

export const DetailsGetter = (): null => {
  map = useGoogleMap() as google.maps.Map

  const {dispatchMap} = useMapContext()

  useEffect((): void => {
    service = new google.maps.places.PlacesService(map)

    request = {
      placeId: PLACE_ID,
      fields: PLACE_FIELDS,
    }
    service.getDetails(request, (
      results: google.maps.places.PlaceResult | null,
      status: google.maps.places.PlacesServiceStatus
    ): void => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatchMap({type: 'STORE_DETAILS', details: results})
      }
    })
  }, [dispatchMap])

  return null
}

export const ResizeStreetView = (): null => {
  const {map} = useMapContext()
  if (!map.open && map.openBttn) {
    // resize event seems to 'updates' GoogleMap and 'fills' the StreetView
    // using setTimeOut due DOM operations being slow as discussed here: https://groups.google.com/g/google-maps-js-api-v3/c/arWFGUapU3o
    setTimeout((): void => {
      window.dispatchEvent(new Event('resize'))
    }, 1000)
  }

  return null
}

