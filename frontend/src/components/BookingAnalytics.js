import React, { useContext } from 'react';
import AnalyticsContext from '../context/AnalyticsContext';

const BookingAnalytics = () => {
  const { bookingAnalytics } = useContext(AnalyticsContext);

  return (
    <div className="booking-analytics">
      <h2>Booking Analytics</h2>
      <p>Total Bookings: {bookingAnalytics.totalBookings}</p>
      <p>Completed Bookings: {bookingAnalytics.completedBookings}</p>
      <p>New Bookings (Last 30 Days): {bookingAnalytics.newBookings}</p>
    </div>
  );
};

export default BookingAnalytics;