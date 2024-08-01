import { createContext, useState, useEffect } from 'react';
import api from '../api';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [userAnalytics, setUserAnalytics] = useState({});
  const [serviceAnalytics, setServiceAnalytics] = useState({});
  const [bookingAnalytics, setBookingAnalytics] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found.');
        return;
      }

      try {
        const [userRes, serviceRes, bookingRes] = await Promise.all([
          api.get('/analytics/users', { headers: { 'x-auth-token': token } }),
          api.get('/analytics/services', { headers: { 'x-auth-token': token } }),
          api.get('/analytics/bookings', { headers: { 'x-auth-token': token } })
        ]);

        setUserAnalytics(userRes.data);
        setServiceAnalytics(serviceRes.data);
        setBookingAnalytics(bookingRes.data);
      } catch (err) {
        setError('Failed to fetch analytics data.');
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <AnalyticsContext.Provider value={{ userAnalytics, serviceAnalytics, bookingAnalytics, error }}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsContext;

