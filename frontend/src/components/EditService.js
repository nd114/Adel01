//Edit a service
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServiceContext from '../context/ServiceContext';

const EditService = () => {
  const { id } = useParams();
  const { services, updateService } = useContext(ServiceContext);
  const service = services.find((service) => service._id === id);
  const [formData, setFormData] = useState({
    title: service?.title || '',
    description: service?.description || '',
    category: service?.category || '',
    location: service?.location || '',
    price: service?.price || '',
  });

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        category: service.category,
        location: service.location,
        price: service.price,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateService(id, formData);
    // Redirect or update the UI as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Update Service</button>
    </form>
  );
};

export default EditService;
