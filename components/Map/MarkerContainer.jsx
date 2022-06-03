import tw, {css, styled} from 'twin.macro';
import {Marker, useGoogleMap} from '@react-google-maps/api';
import {BUSINESS_LOCATION} from '../../static/js/constants';

import {useMapContext} from '../../context/MapProvider';

const onMarkerClick = (dispatch) => {
  dispatch({type: 'SHOW_OPEN_BTTN'})
}

const MarkerContainer = ({position, userLocation}) => {
  const {dispatchMap} = useMapContext();

  return (
    <div>
      <Marker
      onClick={userLocation ? () => {} : () => onMarkerClick(dispatchMap)}
        position={position} />
    </div>
  )
}

export default MarkerContainer
