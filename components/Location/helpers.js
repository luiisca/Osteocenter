export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(pos)
        }, () => reject('Error: the location service failed')
      );
    } else {
      reject("Error: your browser doesn't support geolocation");
    }
  })
}

