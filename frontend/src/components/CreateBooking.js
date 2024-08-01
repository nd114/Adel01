import React, { useState, useContext } from 'react';
import BookingContext from '../context/BookingContext';
import ServiceContext from '../context/ServiceContext';

const CreateBooking = () => {
  const { createBooking } = useContext(BookingContext);
  const { services } = useContext(ServiceContext);
  const [formData, setFormData] = useState({
    service: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBooking(formData);
    setFormData({
      service: '',
      date: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="service" value={formData.service} onChange={handleChange} required>
        <option value="">Select Service</option>
        {services.map((service) => (
          <option key={service._id} value={service._id}>
            {service.title}
          </option>
        ))}
      </select>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBooking;
