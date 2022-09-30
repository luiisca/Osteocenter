import { useState } from "react";
import tw, { styled, theme } from "twin.macro";
import { Button } from "@/components/Elements";
import { FaRoute } from "react-icons/fa";
import { Tooltip, Spinner } from "@chakra-ui/react";

import { MAP_DIRECTIONS } from "@/static/ts/constants";
import { getUserLocation } from "./helpers";
import { useLocationContext } from "../LocationProvider";

const StyledButton = styled(Button)((props: any) => [
  tw`mx-auto mt-6`,
  props.fullscreen &&
    tw`fixed bottom-0 z-50 mx-auto mb-6 translate-x-[-50%] left-1/2`,
  props.loadingRoute && tw`cursor-wait`,
]);

const MapButton = ({
  mobile,
  fullscreen,
}: Record<string, boolean>): JSX.Element => {
  const { location, dispatchLocation } = useLocationContext();
  const [loadingRoute, setLoadingRoute] = useState<boolean>(false);

  const getLocation = async (): Promise<void> => {
    setLoadingRoute(true);
    const pos = await getUserLocation();
    setLoadingRoute(false);
    dispatchLocation({ type: "USER_LOCATION", user: pos });
  };

  const toggleRoute = (): void => {
    dispatchLocation({ type: "ROUTE_VISIBILITY" });
  };

  if (mobile && location.user) {
    return (
      <StyledButton
        elType="text"
        cta
        target="_blank"
        href={MAP_DIRECTIONS(location.user)}
        fullscreen={fullscreen}
      >
        Ver Instrucciones
      </StyledButton>
    );
  }
  return (
    <StyledButton
      elType="icon"
      onClick={
        loadingRoute ? () => {} : location.user ? toggleRoute : getLocation
      }
      fullscreen={fullscreen}
      loadingRoute={loadingRoute}
      Icon={() => (
        <>
          {loadingRoute ? (
            <Spinner
              thickness="3px"
              speed="1.3s"
              emptyColor="gray.200"
              color={`${theme<string>`colors.primary`}`}
              size="lg"
            />
          ) : (
            <Tooltip
              label={location.routeActive ? "Ocultar ruta" : "Mostrar ruta"}
              fontSize="sm"
            >
              <span tw="flex w-full h-full items-center justify-center mb-2">
                <FaRoute />
              </span>
            </Tooltip>
          )}
        </>
      )}
    />
  );
};

export default MapButton;
