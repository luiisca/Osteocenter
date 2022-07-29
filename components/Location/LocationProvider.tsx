import { useReducer, useContext, createContext } from "react";

type coors = google.maps.LatLngLiteral;

interface InitialState {
  user: coors | null;
  routeActive: boolean;
}

type ACTIONTYPE =
  | { type: "USER_LOCATION"; user: coors }
  | { type: "ROUTE_VISIBILITY" };

interface Props {
  children: React.ReactNode;
}

const initialState = {
  user: null,
  routeActive: false,
};

const LocationContext = createContext<{
  location: InitialState;
  dispatchLocation: React.Dispatch<ACTIONTYPE>;
}>({
  location: initialState,
  dispatchLocation: () => {},
});

const locationReducer = (
  state: InitialState,
  action: ACTIONTYPE
): InitialState => {
  switch (action.type) {
    case "USER_LOCATION":
      return { user: action.user, routeActive: true };
    case "ROUTE_VISIBILITY":
      return { ...state, routeActive: !state.routeActive };
    default:
      return state;
  }
};

const LocationProvider = ({ children }: Props): JSX.Element => {
  const [location, dispatchLocation] = useReducer(
    locationReducer,
    initialState
  );

  return (
    <LocationContext.Provider value={{ location, dispatchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => useContext(LocationContext);
export default LocationProvider;
