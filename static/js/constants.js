export const BUSINESS_LOCATION = {lat: -12.123305609301212, lng: -77.0401126174581};
export const PLACE_ID = 'ChIJnzhbFSTIBZERdvxWvPnibdE';
export const PLACE_FIELDS = ['name', 'rating', 'user_ratings_total', 'vicinity', 'opening_hours', 'photos', 'reviews', 'url'];
export const LIBRARIES = ["places"];
export const MAP_DIRECTIONS = (userLocation) => `https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`

export const TOTAL_STARS = 5;

// carousel
export const ARTICLES_PER_PAGE = 2;
