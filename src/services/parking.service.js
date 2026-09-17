import api from "./api";

export const checkInVehicle = (data) => api.post("/parking/check-in", data);

export const checkOutVehicle = (plateNumber) =>
  api.post("/parking/check-out", { plateNumber });

export const searchVehicles = (plate) => api.get("/parking/search", { plate });

export const listSessions = (params) => api.get("/parking/sessions", params);

export const getSession = (id) => api.get(`/parking/sessions/${id}`);
