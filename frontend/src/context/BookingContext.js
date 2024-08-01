import { createContext, useState, useEffect } from 'react';
import api from '../api'; 

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const res = await api.get('/bookings', {
          headers: { 'x-auth-token': token },
        });
        setBookings(res.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const createBooking = async (bookingData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await api.post('/bookings', bookingData, {
        headers: { 'x-auth-token': token },
      });
      setBookings((prevBookings) => [...prevBookings, res.data]);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const updateBooking = async (id, bookingData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const res = await api.put(`/bookings/${id}`, bookingData, {
        headers: { 'x-auth-token': token },
      });
      setBookings((prevBookings) => prevBookings.map((booking) => (booking._id === id ? res.data : booking)));
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const deleteBooking = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      await api.delete(`/bookings/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, createBooking, updateBooking, deleteBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
