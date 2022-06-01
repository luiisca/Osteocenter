import {useState, useEffect, useRef} from 'react';
import tw, {css, styled} from 'twin.macro';
import {createCustomEqual} from "fast-equals";
// import {isLatLngLiteral} from "@googlemaps/typescript-guards";

const Container = tw.div`w-[900px] h-[500px]`

const Map = ({...options}) => {
  const [map, setMap] = useState()
  const ref = useRef(null)
  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map])

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options)
    }
  }, [map, options])

  return (
    <Container ref={ref} />
  )
}

// React does not do deep comparisons
// Custom deep comparison based on google.maps.LatLng
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    a instanceof google.maps.LatLng ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

export default Map
