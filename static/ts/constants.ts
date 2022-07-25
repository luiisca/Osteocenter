type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

export const SITE_TITLE: string = 'Osteocenter'

// CMS
export const GRAPHQL_ENDPOINT: string = "https://spacexdata.herokuapp.com/graphql";

// Map
export const BUSINESS_LOCATION: google.maps.LatLngLiteral = {
  lat: -12.123305609301212,
  lng: -77.0401126174581,
};

export const PLACE_ID: string = "ChIJnzhbFSTIBZERdvxWvPnibdE";

export const PLACE_FIELDS: string[] = [
  "name",
  "rating",
  "user_ratings_total",
  "vicinity",
  "opening_hours",
  "photos",
  "reviews",
  "url",
];

export const LIBRARIES: Libraries = ["places"];
export const MAP_DIRECTIONS: (userLocation: google.maps.LatLngLiteral) => string = (userLocation) =>
  `https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`;

export const TOTAL_STARS: number = 5;

// Blog
export const ARTICLES_PER_PAGE: number = 2;
