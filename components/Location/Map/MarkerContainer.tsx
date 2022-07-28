import {useState} from 'react';
import {Marker} from '@react-google-maps/api';
import {BUSINESS_LOCATION} from '@/static/ts/constants';

import {useMapContext} from '../MapProvider';

interface Props {
  position?: google.maps.LatLngLiteral
  userLocation?: boolean
}

const MarkerContainer = ({position, userLocation}: Props): JSX.Element => {
  const {dispatchMap} = useMapContext()
  const [bounce, setBounce] = useState<boolean>(false)

  return (
    <div>
      <Marker
        onClick={userLocation ? () => {} : () => dispatchMap({
          type: 'SHOW_OPEN_BTTN'
        })
        }
        animation={bounce ? google.maps.Animation.BOUNCE : undefined}
        onMouseOver={() => setBounce(true)}
        onMouseOut={() => setBounce(false)}
        cursor='pointer'
        title={userLocation ? '' : 'Click para detalles'}
        position={position || BUSINESS_LOCATION} />
    </div>
  )
}

export default MarkerContainer
