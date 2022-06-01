import {useState, useReducer, useContext, createContext} from 'react';

const MapContext = createContext();

const placeReducer = (state, action) => {
  switch (action.type) {
    case 'STORE_DETAILS':
      return {...state, details: action.details}
    case 'TOGGLE_VISIBILITY':
      return {...state, visible: !state.visible}
    case 'TOGGLE_COLLAPSE':
      return {...state, collapse: !state.collapse}
    default:
      return state
  }
}

const MapProvider = ({children}) => {
  const [place, dispatchPlace] = useReducer(placeReducer, {
    details: {},
    visible: false,
    collapse: false,
  })

  return (
    <MapContext.Provider value={{place, dispatchPlace}}>
      {children}
    </MapContext.Provider>
  )
}

export const useMapContext = () => useContext(MapContext)
export default MapProvider

