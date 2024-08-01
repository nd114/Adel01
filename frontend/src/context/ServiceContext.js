//manage serviece state

import { createContext, useState, useEffect } from 'react';
import api from '../api'; //import axios from 'axios';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState([]);

   useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await api.get('/services', {
          headers: { 'x-auth-token': token },
        });
        setServices(res.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);


  const createService = async (serviceData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await api.post('/services', serviceData, {
        headers: { 'x-auth-token': token },
      });
      setServices((prevServices) => [...prevServices, res.data]);
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const updateService = async (id, updatedData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await api.put(`/services/${id}`, updatedData, {
        headers: { 'x-auth-token': token },
      });
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === id ? { ...service, ...updatedData } : service
        )
      );
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const deleteService = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await api.delete(`/services/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== id)
      );
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  return (
    <ServiceContext.Provider
      value={{ services, createService, updateService, deleteService }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export default ServiceContext;
