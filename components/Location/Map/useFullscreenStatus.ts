import { useState, useEffect } from "react";

const useFullscreenStatus: (
  elRef: React.RefObject<HTMLDivElement>
) => [isFullscreen: boolean, setFullscreen: () => void] = (elRef) => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const setFullscreen = () => {
    if (elRef.current == null) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
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

  useEffect(() => {
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
