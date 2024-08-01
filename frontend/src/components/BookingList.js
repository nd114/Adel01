import React, { useContext } from 'react';
import BookingContext from '../context/BookingContext';

const BookingList = () => {
  const { bookings, deleteBooking } = useContext(BookingContext);

  return (
    <div className="booking-list">
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <h3>{booking.service.title}</h3>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p>Status: {booking.status}</p>
            <button onClick={() => deleteBooking(booking._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
