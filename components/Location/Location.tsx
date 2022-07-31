import Map from "./Map";
import tw from "twin.macro";
import { BaseContainer } from "../BaseStyle";
import { Heading } from "../Elements";

import MapProvider from "./MapProvider";
import LocationProvider from "./LocationProvider";

const Container = tw(BaseContainer)`text-center`;

const Location = (): JSX.Element => {
  return (
    <LocationProvider>
      <Container>
        <Heading as="span" subHeading>
          Ubicación
        </Heading>
        <Heading as="h2" secondary>
          Dónde encontrarnos?
        </Heading>

        <MapProvider>
          <Map />
        </MapProvider>
      </Container>
    </LocationProvider>
  );
};

export default Location;
