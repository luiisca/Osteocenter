import {useEffect} from 'react';
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

const DetailsGetter = (): null => {
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

export default DetailsGetter
