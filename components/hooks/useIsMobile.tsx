import { useEffect, useState } from "react";

// could improve using css media queries
// https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device

const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect((): void => {
    setIsMobile(
      "ontouchstart" in window ||
        (navigator.maxTouchPoints > 0 &&
          /Mobi|Android/i.test(navigator.userAgent))
    );
  }, []);

  return isMobile;
};

export default useIsMobile;
