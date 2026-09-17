import api from "./api";

export const listGarages = () => api.get("/garages");

export const getGarage = (id) => api.get(`/garages/${id}`);

export const createGarage = (data) => api.post("/garages", data);

export const updateGarage = (id, data) => api.put(`/garages/${id}`, data);
