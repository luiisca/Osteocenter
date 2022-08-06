// libraries
import tw, { css, styled } from "twin.macro";
import { useRef } from "react";
import { useSpring, config, animated } from "react-spring";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// icons
import { RiFullscreenExitFill, RiFullscreenFill } from "react-icons/ri";

// helpers
import { useMapContext } from "../MapProvider";
import { BUSINESS_LOCATION, LIBRARIES } from "@/static/ts/constants";
import { DetailsGetter, ResizeStreetView } from "./helpers";
import useFullscreenStatus from "./useFullscreenStatus";
import useIsMobile from "@/components/hooks/useIsMobile";
import useBreakPointChange from "@/components/hooks/useBreakPointChange";

// components
import MapButton from "./MapButton";
import Route from "./Route";
import PlaceDetails from "./PlaceDetails";

const Loading = (): JSX.Element => {
  return <h1>Loading...</h1>;
};

export const Container = styled.div(
  ({ mapFullscreen }: { mapFullscreen: boolean }) => [
    tw`text-left`,
    tw`relative transition-all`,
    tw`overflow-hidden mx-auto my-0 rounded-2xl w-full max-w-[900px] h-[400px] md:h-[450px] blog-lg:h-[500px]`,
    css`
      box-shadow: 1px 1px 10px 0 rgb(116 192 252 / 15%);
      &:hover {
        box-shadow: 1px 1px 15px 0 rgb(116 192 252 / 25%);
      }
    `,
    mapFullscreen && tw`rounded-none`,
  ]
);

export const GoogleMapContainer = styled(animated.div)(() => [
  tw`w-full h-full`,
  tw`absolute top-0 left-0`,
  tw`inline-block`,
]);
export const FullscreenBttn = styled.div(() => [
  tw`w-10 h-10 bg-white`,
  tw`absolute z-10 top-2 right-2`,
  tw`flex items-center justify-center`,
  tw`text-xl text-accent-555 hover:text-accent-333`,
  tw`rounded-[2px] cursor-pointer`,
  css`
    box-shadow: rgb(0 0 0 / 30%) 0px 1px 4px -1px;
  `,
]);

const Map = (): JSX.Element => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
    region: "PE",
    language: "es",
  });
  const { map, dispatchMap } = useMapContext();
  const isMobile = useIsMobile();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setFullscreen] = useFullscreenStatus(containerRef);
  const matchesValue = useBreakPointChange<string>({
    initialValue: "100%",
    defaultValue: "25%",
    mobMdValue: "50%",
    mdValue: "65%",
    blogLgValue: "65%",
  });

  // animations
  const mapSpring = useSpring({
    left: map.open ? `${100 - Number(matchesValue.slice(0, -1))}%` : "0%",
    width: map.open ? matchesValue : "100%",
    overflow: "hidden",

    config: config.default,
  });

  const renderMap = (): JSX.Element => {
    return (
      <>
        <Container mapFullscreen={isFullscreen} ref={containerRef}>
          <PlaceDetails />

          <GoogleMapContainer style={mapSpring} ref={mapContainerRef}>
            <GoogleMap
              zoom={16}
              center={BUSINESS_LOCATION}
              clickableIcons={false}
              options={{
                fullscreenControl: false,
                gestureHandling: "greedy",
              }}
              mapContainerStyle={{
                height: "100%",
                width: "100%",
              }}
            >
              <ResizeStreetView />
              <Route />
              <DetailsGetter />
            </GoogleMap>

            <FullscreenBttn
              onClick={() => {
                dispatchMap({ type: "MAP_FULLSCREEN" });
                setFullscreen();
              }}
            >
              {map.fullscreen ? <RiFullscreenExitFill /> : <RiFullscreenFill />}
            </FullscreenBttn>
            {isFullscreen && (
              <MapButton mobile={isMobile} fullscreen={isFullscreen} />
            )}
          </GoogleMapContainer>
        </Container>
        <MapButton mobile={isMobile} />
      </>
    );
  };

  if (loadError) {
    return <p>Map cannot be loaded</p>;
  }

  return (
    // useJsApiLoader is async
    // might not be neccesary because of SSR
    isLoaded ? renderMap() : <Loading />
  );
};

export default Map;
