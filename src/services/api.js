import { getToken } from "../utils/storage";

const BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
  /\/$/,
  "",
);

function friendlyMessage(status, payload) {
  const raw =
    (payload && (payload.message || payload.error || payload.msg)) ||
    (Array.isArray(payload?.errors) && payload.errors[0]?.msg);
  if (raw && typeof raw === "string") return raw;
  if (status === 401) return "Your session has expired. Please log in again.";
  if (status === 403) return "You do not have permission to perform this action.";
  if (status === 404) return "We couldn't find what you were looking for.";
  if (status >= 500) return "The server is having trouble right now. Please try again.";
  return "Something went wrong. Please try again.";
}

async function request(path, { method = "GET", body, params } = {}) {
  const url = new URL(`${BASE_URL}${path}`, "http://placeholder.local");
  const isAbsolute = /^https?:\/\//i.test(BASE_URL);
  let finalUrl = isAbsolute ? `${BASE_URL}${path}` : url.pathname;

  if (params) {
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") search.append(k, v);
    });
    const qs = search.toString();
    if (qs) finalUrl += `${finalUrl.includes("?") ? "&" : "?"}${qs}`;
  }

  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(finalUrl, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      "Unable to reach the parking server. Check your connection and try again.",
    );
  }

  let payload = null;
  const text = await response.text();
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    const error = new Error(friendlyMessage(response.status, payload));
    error.status = response.status;
    throw error;
  }

  return payload;
}

export const api = {
  get: (path, params) => request(path, { method: "GET", params }),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
};

export default api;
