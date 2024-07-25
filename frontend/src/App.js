import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import TaskList from './components/TaskList';

function App() {
  // State to manage tasks
  const [tasks, setTasks] = useState([]);

  // State to manage top businesses
  const [topBusinesses, setTopBusinesses] = useState([]);

  // State to manage rating data
  const [ratingData, setRatingData] = useState({
    businessId: '',
    rating: '',
    comment: '',
  });

  // Handle input changes for rating form
  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setRatingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle rating form submission
  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://adel01.herokuapp.com/api/ratings', ratingData, {
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

  // Fetch data (tasks and top businesses) when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks
        const tasksResponse = await axios.get('https://adel01.herokuapp.com/api/tasks');
        setTasks(tasksResponse.data);

        // Fetch top businesses
        const topBusinessesResponse = await axios.get('https://adel01.herokuapp.com/api/ratings/top-businesses');
        setTopBusinesses(topBusinessesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      {/* Navbar component */}
      <Navbar />
      <Routes>
        {/* Define routes and their corresponding components */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/rate" element={
          <div className="App">
            <h2>Submit Rating</h2>
            <form onSubmit={handleRatingSubmit}>
              <input type="text" name="businessId" placeholder="Business ID" value={ratingData.businessId} onChange={handleRatingChange} required />
              <input type="number" name="rating" placeholder="Rating (1-5)" value={ratingData.rating} onChange={handleRatingChange} min="1" max="5" required />
              <textarea name="comment" placeholder="Comment" value={ratingData.comment} onChange={handleRatingChange} />
              <button type="submit">Submit Rating</button>
            </form>
          </div>
        } />
        <Route path="/top-businesses" element={
          <div className="App">
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
          </div>
        } />
        <Route path="/tasks-list" element={
          <div className="App">
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
        } />
      </Routes>
    </Router>
  );
}

export default App;
