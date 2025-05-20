import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser, getCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then(data => {
          setUser(data.body);
        })
        .catch(err => {
          console.error('Failed to fetch user:', err);
          localStorage.removeItem('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await loginUser(email, password);
      if (response.statusCode === 200) {
        localStorage.setItem('token', response.body.token);
        setUser(response.body.user);
        return response.body;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError(err.message || 'Login failed');
      return null;
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const response = await registerUser(userData);
      if (response.statusCode === 201) {
        return response.body;
      } else {
        setError(response.message);
        return null;
      }
    } catch (err) {
      setError(err.message || 'Registration failed');
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};