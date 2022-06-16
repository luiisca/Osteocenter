import {useMapContext} from '../../context/MapProvider';

const ResizeStreetView = (): null => {
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

export default ResizeStreetView
