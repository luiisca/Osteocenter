import {useReducer, useContext, createContext} from 'react';

const LocationContext = createContext(null);

const initialState = {
  user: null,
  routeActive: true,
}
type ACTIONTYPE =
  | {type: 'USER_LOCATION', user: google.maps}
  | {type: 'ROUTE_VISIBILITY'}

const locationReducer = (state: typeof initialState, action) => {
  switch (action.type) {
    case 'USER_LOCATION':
      return {...state, user: action.user}
    case 'ROUTE_VISIBILITY':
      return {...state, routeActive: !state.routeActive}
    default:
      return state
  }
}

const LocationProvider = ({children}) => {
  const [location, dispatchLocation] = useReducer(locationReducer, {
    user: null,
    routeActive: true,
  })

  return (
    <LocationContext.Provider value={{location, dispatchLocation}}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => useContext(LocationContext)
export default LocationProvider
