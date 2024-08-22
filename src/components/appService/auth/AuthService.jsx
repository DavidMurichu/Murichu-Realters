import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../Delay';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/verify-token`, { token });
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid, clear localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('username');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token validation error:', error);
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      const { token, access, refresh } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('username', username);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.detail || 'Login error' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, checkTokenValidity }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
