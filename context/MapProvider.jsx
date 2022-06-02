import {useReducer, useContext, createContext} from 'react';

const MapContext = createContext();

const placeReducer = (state, action) => {
  switch (action.type) {
    case 'STORE_DETAILS':
      return {...state, details: action.details}
    case 'HIDE':
      return {...state, invisible: true, open: false, openBttn: false}
    case 'TOGGLE_OPEN':
      return {...state, open: !state.open}
    case 'SHOW_OPEN_BTTN':
      return {...state, open: true, openBttn: true, invisible: false}
    case 'MAP_FULLSCREEN':
      return {...state, fullscreen: !state.fullscreen}
    default:
      return state
  }
}

const MapProvider = ({children}) => {
  const [map, dispatchMap] = useReducer(placeReducer, {
    placeDetails: {},
    invisible: false,
    open: false,
    openBttn: false,
    fullscreen: false,
  })

  return (
    <MapContext.Provider value={{map, dispatchMap}}>
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => useContext(MapContext)
export default MapProvider
