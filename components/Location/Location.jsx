import {useState} from 'react';
import tw, {css, styled} from 'twin.macro';
import {FaRoute} from 'react-icons/fa';
import {BaseContainer as Container} from '../BaseStyle';
import {Button, Heading} from '../Elements';
import Map from '../Map';

const Location = () => {
  const [userLocation, setUserLocation] = useState(null)
  const [positionActive, setPositionActive] = useState(false)
  const getUserLocation = () => {
    if (navigator.geolocation) {
      !positionActive && (navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(pos);

          return;
        },
        () => {
          handleLocationError(true);
        }
      ));
      setPositionActive(!positionActive);
      setUserLocation(null);
    } else {
      handleLocationError(false);
    }
  }

  const handleLocationError = (browserHasGeolocation) => {
    return browserHasGeolocation ? 'Error: the location service failed' : "Error: your browser doesn't support geolocation"
  }

  return (
    <Container tw='text-center'>
      <Heading as='span' subHeading>Ubicación</Heading>
      <Heading as='h2' secondary>Dónde encontrarnos?</Heading>
      <Map userLocation={userLocation} />
      <Button type='icon' onClick={getUserLocation}><FaRoute /></Button>
    </Container>
  )
}

export default Location
