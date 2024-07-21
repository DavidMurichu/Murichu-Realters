import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          console.log('response')

          // Send a request to your backend to validate the token
          const response = await axios.post('http://127.0.0.1:8000/api/verify-token', {
            token,
          });
          console.log('response', response)
          // Assuming your backend returns a valid response indicating token validity
          if (response.data) {
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear localStorage and set isAuthenticated to false
            localStorage.removeItem('token');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('username');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Token validation error:', error);
          // Handle error if unable to validate token (e.g., network error)
          setIsAuthenticated(false);
        }
      }
    };

    // Check token validity on component mount
    checkTokenValidity();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username,
        password,
      });

      const { token, access, refresh } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('username', username); // Store username

      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.response?.data?.detail || 'Login error' };
    }
  };

  const logout = () => {
    // Implement logout logic as needed
    localStorage.removeItem('token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
