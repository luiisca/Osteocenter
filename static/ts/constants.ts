type Libraries = (
  | "drawing"
  | "geometry"
  | "localContext"
  | "places"
  | "visualization"
)[];

export const SITE_TITLE: string = "Osteocenter";
export const AUTHOR: string = "Dr. Ronal Cadillo Medina";
export const FACEBOOK_PAGE: string =
  "https://www.facebook.com/Osteocenter-110031325020842";
export const PHONE1: string = "+51992569407";
export const PHONE2: string = "+51969780055";
export const MAIL: string = "mailto:osteocenter.admi@gmail.com";
export const ADDRESS: string =
  "Clínica SantaMaría, Elías Aguirre #761- interior 1er piso, 2do Pabellón Chimbote, Perú";
export const getWhatsappLink: (mobile: boolean) => string = (mobile) =>
  `https://${
    mobile ? "api" : "web"
  }.whatsapp.com/send?phone=${PHONE2}&text=${encodeURIComponent(
    "Hola. Me gustaría que me contactaran para poder resolver unas dudas."
  )}`;
export const WEB_LINK = "https://osteocenter.vercel.app";

// Map
export const BUSINESS_LOCATION: google.maps.LatLngLiteral = {
  lat: -9.07072482316217,
  lng: -78.59092492175259,
};

export const PLACE_ID: string = "ChIJZQ3ieRaBq5ERWG2Zvo3vdX8";

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
export const MAP_DIRECTIONS: (
  userLocation: google.maps.LatLngLiteral
) => string = (userLocation) =>
  `https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${BUSINESS_LOCATION.lat},${BUSINESS_LOCATION.lng}`;

export const TOTAL_STARS: number = 5;

// Blog
export const ARTICLES_PER_PAGE: number = 2;
