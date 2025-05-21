import api from './api';

// Vehicle entry and exit services
export const recordVehicleEntry = async (entryData) => {
  const response = await api.post('/vehicles/entry', entryData);
  return response.data;
};

export const recordVehicleExit = async (exitData) => {
  const response = await api.post('/vehicles/exit', exitData);
  return response.data;
};

export const getVehicleEntries = async (filters = {}, page = 1, limit = 10) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...filters
  });
  
  const response = await api.get(`/vehicles?${queryParams}`);
  return response.data;
};

export const getVehicleEntryById = async (id) => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const getVehicleBill = async (id) => {
  const response = await api.get(`/vehicles/${id}/bill`);
  return response.data;
};