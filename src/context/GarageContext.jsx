import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { listGarages } from "../services/garage.service";
import { getSelectedGarageId, setSelectedGarageId } from "../utils/storage";
import { useAuth } from "../hooks/useAuth";

const GarageContext = createContext(null);

export function GarageProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [garages, setGarages] = useState([]);
  const [garageId, setGarageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    listGarages()
      .then((res) => {
        if (cancelled) return;
        const list = Array.isArray(res) ? res : (res?.data ?? res?.garages ?? []);
        setGarages(list);
        const stored = getSelectedGarageId();
        const match = list.find((g) => (g._id || g.id) === stored);
        const next = match ? stored : list.length ? (list[0]._id ?? list[0].id) : null;
        if (next) {
          setGarageId(next);
          setSelectedGarageId(next);
        }
      })
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const selectGarage = (id) => {
    setGarageId(id);
    setSelectedGarageId(id);
  };

  const value = useMemo(
    () => ({ garages, garageId, selectGarage, loading, error }),
    [garages, garageId, loading, error],
  );

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}

export function useGarages() {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error("useGarages must be used inside GarageProvider");
  return ctx;
}
