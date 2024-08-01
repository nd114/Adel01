//create, list, delete service. With ServiceList.js 

import React, { useState, useContext } from 'react';
import ServiceContext from '../context/ServiceContext';

const CreateService = () => {
  const { createService } = useContext(ServiceContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    price: '',
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
    await createService(formData);
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      price: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
      <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Create Service</button>
    </form>
  );
};

export default CreateService;
