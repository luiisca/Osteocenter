import { tokenKey, BASE_URI } from "../config";

export default async function apiFetch(
  endpoint,
  { method, headers, body } = {}
) {
  const token = sessionStorage.getItem(tokenKey);

  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }

  if (body) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  const config = {
    method: method || (body ? "POST" : "GET"),
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(BASE_URI + endpoint, config);

  let data;
  if (!response.ok) {
    if (response.status === 401) sessionStorage.removeItem(tokenKey);
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(JSON.stringify(data.errors));
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }

  return data;
}
