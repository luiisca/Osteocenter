import React, { useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";
import { BUSINESS_LOCATION } from "@/static/ts/constants";

import { useLocationContext } from "../LocationProvider";
import MarkerContainer from "./MarkerContainer";

const Route = () => {
  const { location } = useLocationContext();

  const map = useGoogleMap() as google.maps.Map;
  const ref = useRef<{
    directionsService: google.maps.DirectionsService | null;
    directionsRenderer: google.maps.DirectionsRenderer | null;
  }>({
    directionsService: null,
    directionsRenderer: null,
  });

  const removeDirections = (): void => {
    ref.current.directionsRenderer?.setMap(null);
    ref.current.directionsRenderer?.setDirections({ routes: [] });
  };

  const centerBusiness = (): void => {
    map.setCenter(BUSINESS_LOCATION);
    map.setZoom(16);
  };

  if (location.user && location.routeActive) {
    ref.current.directionsService = new google.maps.DirectionsService();
    const rendererOptions = {
      map: map,
      suppressMarkers: true,
    };
    ref.current.directionsRenderer = new google.maps.DirectionsRenderer(
      rendererOptions
    );
    ref.current.directionsRenderer.setMap(map);

    const request = {
      origin: location.user,
      destination: BUSINESS_LOCATION,
      travelMode: "DRIVING" as google.maps.TravelMode,
    };

    ref.current.directionsService.route(request, (result, status) => {
      if (status == "OK") {
        ref.current.directionsRenderer?.setDirections(result);
      }
    });

    return (
      <>
        <MarkerContainer position={location.user} userLocation />
        <MarkerContainer position={BUSINESS_LOCATION} />
      </>
    );
  } else {
    removeDirections();
    centerBusiness();

    return <MarkerContainer position={BUSINESS_LOCATION} />;
  }
};

export default React.memo(Route);
