import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth header
const authAxios = axios.create({
  baseURL: API_URL,
});

// Add auth token to requests
authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error. Please try again.');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await authAxios.get(`${API_URL}/users/me`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to get user');
    }
    throw new Error('Network error. Please try again.');
  }
};

export default authAxios;