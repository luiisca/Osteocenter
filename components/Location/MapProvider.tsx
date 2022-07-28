import { useReducer, useContext, createContext } from "react";

interface InitialState {
  details: google.maps.places.PlaceResult | null;
  invisible: boolean;
  open: boolean;
  openBttn: boolean;
  fullscreen: boolean;
  resize: boolean;
}

type ACTIONTYPE =
  | { type: "STORE_DETAILS"; details: google.maps.places.PlaceResult | null }
  | { type: "HIDE" }
  | { type: "TOGGLE_OPEN" }
  | { type: "SHOW_OPEN_BTTN" }
  | { type: "MAP_FULLSCREEN" }
  | { type: "RESIZE" };

interface Props {
  children: React.ReactNode;
}

const initialState: InitialState = {
  details: null,
  invisible: false,
  open: false,
  openBttn: false,
  fullscreen: false,
  resize: false,
};

const MapContext = createContext<{
  map: InitialState;
  dispatchMap: React.Dispatch<ACTIONTYPE>;
}>({
  map: initialState,
  dispatchMap: () => {},
});

const placeReducer = (
  state: InitialState,
  action: ACTIONTYPE
): InitialState => {
  switch (action.type) {
    case "STORE_DETAILS":
      return { ...state, details: action.details };
    case "HIDE":
      return { ...state, invisible: true, open: false, openBttn: false };
    case "TOGGLE_OPEN":
      return { ...state, open: !state.open };
    case "SHOW_OPEN_BTTN":
      return { ...state, open: true, openBttn: true, invisible: false };
    case "MAP_FULLSCREEN":
      return { ...state, fullscreen: !state.fullscreen };
    case "RESIZE":
      return { ...state, resize: true };
    default:
      return state;
  }
};

const MapProvider = ({ children }: Props) => {
  const [map, dispatchMap] = useReducer(placeReducer, initialState);

  return (
    <MapContext.Provider value={{ map, dispatchMap }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
export default MapProvider;
