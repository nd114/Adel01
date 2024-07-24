import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'customer',
    businessBio: '',
    businessFields: [],
  });

  const [tasks, setTasks] = useState([]);
  const [topBusinesses, setTopBusinesses] = useState([]);
  const [ratingData, setRatingData] = useState({
    businessId: '',
    rating: '',
    comment: '',
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
      const response = await axios.post('adel01.herokuapp.com/api/users/register', formData);
      console.log(response.data);
      alert('Registration successful!');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering user');
    }
  };

  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setRatingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://adel01.herokuapp.com/api/ratings', ratingData, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log(response.data);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksResponse = await axios.get('http://adel01.herokuapp.com/api/tasks');
        setTasks(tasksResponse.data);

        const topBusinessesResponse = await axios.get('http://adel01.herokuapp.com/api/ratings/top-businesses');
        setTopBusinesses(topBusinessesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Aidel</h1>
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

      {/* Rating submission form */}
      <h2>Submit Rating</h2>
      <form onSubmit={handleRatingSubmit}>
        <input type="text" name="businessId" placeholder="Business ID" value={ratingData.businessId} onChange={handleRatingChange} required />
        <input type="number" name="rating" placeholder="Rating (1-5)" value={ratingData.rating} onChange={handleRatingChange} min="1" max="5" required />
        <textarea name="comment" placeholder="Comment" value={ratingData.comment} onChange={handleRatingChange} />
        <button type="submit">Submit Rating</button>
      </form>

      <h2>Top Businesses</h2>
      <ul>
        {topBusinesses.map((business) => (
          <li key={business._id}>
            <h3>{business.username}</h3>
            <p>Average Rating: {business.averageRating.toFixed(1)}</p>
            <p>Total Ratings: {business.totalRatings}</p>
          </li>
        ))}
      </ul>

      <h2>Available Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Category: {task.category}</p>
            <p>Location: {task.location}</p>
            <p>Price: ${task.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
