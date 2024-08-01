import { request } from "./api";
import { baseUrl } from "./constants";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwrzc.port0.org"
    : "http://localhost:3001";

export const register = (data) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const authorize = (data) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
