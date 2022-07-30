import Map from "./Map";
import tw from "twin.macro";
import { BaseContainer } from "../BaseStyle";
import { Heading } from "../Elements";

import MapProvider from "./MapProvider";
import LocationProvider from "./LocationProvider";

const Location = (): JSX.Element => {
  return (
    <LocationProvider>
      <BaseContainer tw="text-center">
        <Heading as="span" subHeading>
          Ubicación
        </Heading>
        <Heading as="h2" secondary>
          Dónde encontrarnos?
        </Heading>

        <MapProvider>
          <Map />
        </MapProvider>
      </BaseContainer>
    </LocationProvider>
  );
};

export default Location;
