import { useState, useLayoutEffect } from "react";

const useFullscreenStatus: (
  elRef: any
) => [isFullscreen: boolean, setFullscreen: () => void] = (elRef) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const setFullscreen = () => {
    if (elRef.current == null) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
      console.log("NOT FULLSCREEN");
    } else {
      console.log("FULLSCREEN");
      elRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch(() => {
          setIsFullscreen(false);
        });
    }
  };

  useLayoutEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(document.fullscreenElement !== null);

    document.onfullscreenchange = onFullscreenChange;

    return document.removeEventListener(
      "onfullscreenchange",
      onFullscreenChange
    );
  });

  return [isFullscreen, setFullscreen];
};

export default useFullscreenStatus;
