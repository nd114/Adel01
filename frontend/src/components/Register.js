//Adjusted for the dropdown menu

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'customer',
    businessBio: '',
    businessFields: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const updatedFields = checked
        ? [...prevData.businessFields, value]
        : prevData.businessFields.filter((field) => field !== value);
      return {
        ...prevData,
        businessFields: updatedFields,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://adel01.herokuapp.com/api/users/register', formData);
      console.log(response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="customer">Customer</option>
          <option value="business">Business</option>
        </select>
        {formData.userType === 'business' && (
          <>
            <textarea name="businessBio" placeholder="Business Bio" value={formData.businessBio} onChange={handleChange} required />
            <fieldset>
              <legend>Select Fields:</legend>
              <label>
                <input type="checkbox" name="businessFields" value="Sports & Healthcare" onChange={handleCheckboxChange} />
                Sports & Healthcare
              </label>
              <label>
                <input type="checkbox" name="businessFields" value="Education, Tutoring and Consulting" onChange={handleCheckboxChange} />
                Education, Tutoring and Consulting
              </label>
              <label>
                <input type="checkbox" name="businessFields" value="Manual labour, home services and repairs" onChange={handleCheckboxChange} />
                Manual labour, home services and repairs
              </label>
              <label>
                <input type="checkbox" name="businessFields" value="Event planning, catering and decoration" onChange={handleCheckboxChange} />
                Event planning, catering and decoration
              </label>
              <label>
                <input type="checkbox" name="businessFields" value="Fashion & Tailoring" onChange={handleCheckboxChange} />
                Fashion & Tailoring
              </label>
            </fieldset>
          </>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
