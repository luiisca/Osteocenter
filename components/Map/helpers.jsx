import {useEffect} from 'react';
import {useGoogleMap} from '@react-google-maps/api';

import {PLACE_ID, PLACE_FIELDS} from '../../static/js/constants';
import {useMapContext} from '../../context/MapProvider';

const DetailsGetter = () => {
  const map = useGoogleMap()
  const {dispatchMap} = useMapContext()

  useEffect(() => {
    const service = new google.maps.places.PlacesService(map)

    const request = {
      placeId: PLACE_ID,
      fields: PLACE_FIELDS,
    }
    service.getDetails(request, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        dispatchMap({type: 'STORE_DETAILS', details: place});
      }
    })
  }, [dispatchMap, map])

  return null;
}

export default DetailsGetter
