import api from "./api";

export const listSpots = (params) => api.get("/spots", params);

export const createSpot = (data) => api.post("/spots", data);

export const getAvailability = (garageId) =>
  api.get(`/garages/${garageId}/spots/availability`);
