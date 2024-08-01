import { createContext, useState, useEffect } from 'react';
import api from '../api';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found, make sure you are logged in');
        return;
      }

      try {
        const res = await api.get('/notifications', {
          headers: { 'x-auth-token': token },
        });
        setNotifications(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const createNotification = async (message) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, make sure you are logged in');
      return;
    }

    try {
      const res = await api.post('/notifications', { message }, {
        headers: { 'x-auth-token': token },
      });
      setNotifications((prevNotifications) => [res.data, ...prevNotifications]);
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const markAsRead = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, make sure you are logged in');
      return;
    }

    try {
      await api.put(`/notifications/${id}`, { read: true }, {
        headers: { 'x-auth-token': token },
      });
      setNotifications((prevNotifications) => 
        prevNotifications.map((notification) => 
          notification._id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, createNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
