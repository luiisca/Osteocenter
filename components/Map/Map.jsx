import React from 'react';
import {useState, useEffect, useRef} from 'react';
import tw, {css, styled} from 'twin.macro';
import {createCustomEqual} from "fast-equals";

const Container = tw.div`my-0 mx-auto rounded-2xl w-[900px] h-[500px]`

const Map = ({children, ...options}) => {
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
    <div>
      <Container ref={ref} />
      <Marker position={{lat: -12.1193972, lng: -77.0339762}} map={map} />
    </div>
  )
}

const Marker = ({position}) => {
  const [marker, setMarker] = useState()

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker())
    }

    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])
  useEffect(() => {
    if (marker) {
      marker.setOptions(position)
    }
  }, [marker, position])

  return null
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
