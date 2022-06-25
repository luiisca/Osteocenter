import apiFetch from "./api-fetch";

export function createFavorite(favorite) {
  return apiFetch("favorites", {
    body: favorite,
  });
}

export function getFavorites() {
  return apiFetch("favorites");
}

export function removeFavorite(id) {
  return apiFetch(`favorites/${id}`, { method: "DELETE" });
}
