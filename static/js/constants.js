export const BUSINESS_LOCATION = {lat: -12.123305609301212, lng: -77.0401126174581};
export const LIBRARIES = ["places"];
export const MAP_DIRECTIONS = (userLocation) => `https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`
