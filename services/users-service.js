import { tokenKey } from "../config";
import apiFetch from "./api-fetch";

export async function getUser() {
  const { _token, ...user } = await apiFetch("profile");

  return user;
}

export async function createUser(newUser) {
  const { token, ...user } = await apiFetch("signup", { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function updateUser(data) {
  const { _token, ...user } = await apiFetch("profile", {
    body: data,
    method: "PATCH",
  });
  return user;
}

export async function deleteUser() {
  await apiFetch("profile", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
}
