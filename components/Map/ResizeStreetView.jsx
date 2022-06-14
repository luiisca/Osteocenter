import {useGoogleMap} from '@react-google-maps/api';
import {useMapContext} from '../../context/MapProvider';


const ResizeStreetView = () => {
  const {map} = useMapContext()
  if (!map.open && map.openBttn) {
    // resize event 'updates' the GoogleMap and 'fills' the StreetView
    // using setTimeOut because DOM operations are slow as discussed here: https://groups.google.com/g/google-maps-js-api-v3/c/arWFGUapU3o
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    }, 1000)
  }

  return null
}

export default ResizeStreetView
