import tw, { styled, css } from "twin.macro";
import { Button } from "@/components/Elements";
import { FaRoute } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";

import { MAP_DIRECTIONS } from "@/static/ts/constants";
import { getUserLocation } from "./helpers";
import { useLocationContext } from "../LocationProvider";

const StyledButton = styled(Button)((props: any) => [
  props.fullscreen &&
    tw`fixed bottom-0 z-50 mx-auto mb-6 translate-x-[-50%] left-1/2`,
]);

const MapButton = ({
  mobile,
  fullscreen,
}: Record<string, boolean>): JSX.Element => {
  const { location, dispatchLocation } = useLocationContext();

  const getLocation = async (): Promise<void> => {
    const pos = await getUserLocation();
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
      onClick={location.user ? toggleRoute : getLocation}
      fullscreen={fullscreen}
      tw="mt-6 mx-auto"
    >
      <Tooltip label="Mostrar ruta" fontSize="sm">
        <span>
          <FaRoute />
        </span>
      </Tooltip>
    </StyledButton>
  );
};

export default MapButton;
