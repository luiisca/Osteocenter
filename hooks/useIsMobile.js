import {useEffect, useState} from 'react';

// could improve using css media queries
// https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    setIsMobile('onTouchStart' in document.documentElement && navigator.userAgent.match('/Mobi|Android/i'))
  }, [])

  return isMobile
}

export default useIsMobile
