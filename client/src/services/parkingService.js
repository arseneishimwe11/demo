import api from './api';

// Parking location services
export const getAllParkingLocations = async (page = 1, limit = 10) => {
  const response = await api.get(`/parking?page=${page}&limit=${limit}`);
  return response.data;
};

export const getParkingLocationByCode = async (code) => {
  const response = await api.get(`/parking/${code}`);
  return response.data;
};

export const createParkingLocation = async (parkingData) => {
  const response = await api.post('/parking', parkingData);
  return response.data;
};

export const updateParkingLocation = async (code, parkingData) => {
  const response = await api.put(`/parking/${code}`, parkingData);
  return response.data;
};

export const deleteParkingLocation = async (code) => {
  const response = await api.delete(`/parking/${code}`);
  return response.data;
};