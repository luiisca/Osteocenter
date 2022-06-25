import apiFetch from "./api-fetch";
export function getUnicorns() {
  return apiFetch("unicorns");
}
export function createUnicorn(unicorn) {
  return apiFetch("unicorns", {
    method: 'POST',
    body: unicorn,
  });
}
