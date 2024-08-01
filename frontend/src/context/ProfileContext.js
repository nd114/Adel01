//This context will manage the profile data and methods for fetching and updating the user's profile.

// src/context/ProfileContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api'; //import axios from 'axios';
import AuthContext from './AuthContext';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        const res = await api.get(/*(axios.get(*/'/api/profile/me', { headers: { 'x-auth-token': token } });
        setProfile(res.data);
      };

      fetchProfile();
    }
  }, [user]);

  const updateProfile = async (profileData) => {
    const token = localStorage.getItem('token');
    const res = await api.put(/*axios.put*/'/api/profile/me', profileData, { headers: { 'x-auth-token': token } });
    setProfile(res.data);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
