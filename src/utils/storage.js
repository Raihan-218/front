const TOKEN_KEY = "pms_token";
const USER_KEY = "pms_user";
const GARAGE_KEY = "pms_garage_id";

const isBrowser = () => typeof window !== "undefined";

export const getToken = () => (isBrowser() ? localStorage.getItem(TOKEN_KEY) : null);
export const setToken = (token) => isBrowser() && localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => isBrowser() && localStorage.removeItem(TOKEN_KEY);

export const getStoredUser = () => {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
export const setStoredUser = (user) =>
  isBrowser() && localStorage.setItem(USER_KEY, JSON.stringify(user));
export const clearStoredUser = () => isBrowser() && localStorage.removeItem(USER_KEY);

export const getSelectedGarageId = () =>
  isBrowser() ? localStorage.getItem(GARAGE_KEY) : null;
export const setSelectedGarageId = (id) =>
  isBrowser() && localStorage.setItem(GARAGE_KEY, id);
