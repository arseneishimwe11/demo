import api from './api';

// Reporting services
export const getUsageReport = async (startDate, endDate, parkingLotId) => {
  const params = new URLSearchParams({
    startDate,
    endDate,
    ...(parkingLotId && { parkingLotId })
  });
  
  const response = await api.get(`/reports/usage?${params}`);
  return response.data;
};

export const getRevenueReport = async (startDate, endDate, parkingLotId) => {
  const params = new URLSearchParams({
    startDate,
    endDate,
    ...(parkingLotId && { parkingLotId })
  });
  
  const response = await api.get(`/reports/revenue?${params}`);
  return response.data;
};

export const getOccupancyReport = async (date, parkingLotId) => {
  const params = new URLSearchParams({
    date,
    ...(parkingLotId && { parkingLotId })
  });
  
  const response = await api.get(`/reports/occupancy?${params}`);
  return response.data;
};

export const getVehicleTypeReport = async (startDate, endDate, parkingLotId) => {
  const params = new URLSearchParams({
    startDate,
    endDate,
    ...(parkingLotId && { parkingLotId })
  });
  
  const response = await api.get(`/reports/vehicle-types?${params}`);
  return response.data;
};