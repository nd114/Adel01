import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchUsersAndServices = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, make sure you are logged in');
        return;
      }

      try {
        const usersResponse = await api.get('/admin/users', {
          headers: { 'x-auth-token': token },
        });
        setUsers(usersResponse.data);

        const servicesResponse = await api.get('/admin/services', {
          headers: { 'x-auth-token': token },
        });
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching users and services:', error);
      }
    };

    fetchUsersAndServices();
  }, []);

  return (
    <AdminContext.Provider value={{ users, services }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
