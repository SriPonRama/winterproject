import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe();
      setState({
        user: response.data.user,
        isAuthenticated: true,
        loading: false
      });
    } catch (error) {
      localStorage.removeItem('token');
      setState(initialState);
    }
  };

  const login = async (credentials) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setState({
        user,
        isAuthenticated: true,
        loading: false
      });
      
      toast.success('Login successful!');
      return user;
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    setState(prev => ({ ...prev, loading: true }));
    
    try {
      const response = await authAPI.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setState({
        user,
        isAuthenticated: true,
        loading: false
      });
      
      toast.success('Registration successful!');
      return user;
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setState(initialState);
    toast.success('Logged out successfully');
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};