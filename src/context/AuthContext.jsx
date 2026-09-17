import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
  clearStoredUser,
  clearToken,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTokenState(getToken());
    setUser(getStoredUser());
    setReady(true);
  }, []);

  const login = useCallback((nextToken, nextUser) => {
    setToken(nextToken);
    if (nextUser) setStoredUser(nextUser);
    setTokenState(nextToken);
    setUser(nextUser ?? null);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    clearStoredUser();
    setTokenState(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), ready, login, logout }),
    [user, token, ready, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
