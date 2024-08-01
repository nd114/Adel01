//This context will manage the authentication state and methods for logging in, registering, and logging out users.

// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import api from '../api'; //import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get(/*(axios.get(*/'/api/profile/me', { headers: { 'x-auth-token': token } })
        .then(res => setUser(res.data))
        .catch(err => console.log(err));
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post(/*axios.post*/'/api/users/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const register = async (userData) => {
    const res = await api.post(/*axios.post*/'/api/users/register', userData);
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
