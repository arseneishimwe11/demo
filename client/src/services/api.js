import axios from "axios";

// Use the API Gateway URL by default
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Create service-specific API instances if needed
export const userServiceApi = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:3004/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const parkingServiceApi = axios.create({
  baseURL:
    import.meta.env.VITE_PARKING_SERVICE_URL || "http://localhost:3002/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const vehicleServiceApi = axios.create({
  baseURL:
    import.meta.env.VITE_VEHICLE_SERVICE_URL || "http://localhost:3005/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const reportingServiceApi = axios.create({
  baseURL:
    import.meta.env.VITE_REPORTING_SERVICE_URL || "http://localhost:3003/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Main API instance (using API Gateway)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle authentication errors
    if (response && response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Add the same interceptors to all service-specific APIs
[
  userServiceApi,
  parkingServiceApi,
  vehicleServiceApi,
  reportingServiceApi,
].forEach((serviceApi) => {
  serviceApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  serviceApi.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      if (response && response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  );
});

export default api;
