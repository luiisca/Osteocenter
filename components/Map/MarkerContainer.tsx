import tw, {css, styled} from 'twin.macro';
import {useState, useEffect} from 'react';
import {Marker, useGoogleMap} from '@react-google-maps/api';

import {useMapContext} from '../../context/MapProvider';

const MarkerContainer = ({position, userLocation}) => {
  const {dispatchMap} = useMapContext()
  const [bounce, setBounce] = useState(false)

  return (
    <div>
      <Marker
        onClick={userLocation ? () => {} : () => dispatchMap({type: 'SHOW_OPEN_BTTN'})}
        animation={bounce ? google.maps.Animation.BOUNCE : null}
        onMouseOver={() => setBounce(true)}
        onMouseOut={() => setBounce(false)}
        cursor='pointer'
        title={userLocation ? '' : 'Click para detalles'}
        position={position} />
    </div>
  )
}

export default MarkerContainer
