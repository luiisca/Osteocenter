import React, {useEffect} from 'react';
import {useGoogleMap} from '@react-google-maps/api';

import {PLACE_ID, PLACE_FIELDS} from '../../static/ts/constants';
import {useMapContext} from '../../context/MapProvider';

interface Request {
  placeId: string
  fields: string[]
}

let map: google.maps.Map | HTMLDivElement
let service: google.maps.places.PlacesService
let request: Request

const DetailsGetter = ():void => {
  map = useGoogleMap() || new HTMLDivElement()

  const {dispatchMap} = useMapContext()

  useEffect(() => {
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
        dispatchMap({type: 'STORE_DETAILS', details: {}});
      }
    })
  }, [dispatchMap, map])
}

export default DetailsGetter