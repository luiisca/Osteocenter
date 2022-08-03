import tw from "twin.macro";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BaseContainer } from "../BaseStyle";
import { Heading } from "../Elements";

import MapProvider from "./MapProvider";
import LocationProvider from "./LocationProvider";

const DynamicMap = dynamic(() => import("./Map"), {
  suspense: true,
});

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
          <Suspense fallback={`Cargando mapa...`}>
            <DynamicMap />
          </Suspense>
        </MapProvider>
      </Container>
    </LocationProvider>
  );
};

export default Location;
