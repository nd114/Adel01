import React, { useState, useEffect } from 'react';
import api from './api'; //import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import TaskList from './components/TaskList';
import TopBusinesses from './components/TopBusinesses';
//import RatingForm from './components/RatingForm';
import ServiceList from './components/ServiceList';
import CreateService from './components/CreateService';
import EditService from './components/EditService';
import BookingList from './components/BookingList';
import CreateBooking from './components/CreateBooking';
import RatingList from './components/RatingList';
import { AuthProvider } from './context/AuthContext';
import { ProfileProvider } from './context/ProfileContext';
import { ServiceProvider } from './context/ServiceContext';
import { BookingProvider } from './context/BookingContext';
import { RatingProvider } from './context/RatingContext';
import { MessageProvider } from './context/MessageContext';
import { AdminProvider } from './context/AdminContext';
import { NotificationProvider } from './context/NotificationContext';
import { SearchProvider } from './context/SearchContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { UserProvider } from './context/UserContext';
import MessageList from './components/MessageList';
import SendMessage from './components/SendMessage';
import AdminDashboard from './components/AdminDashboard';
import NotificationList from './components/NotificationList';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';
import StripeWrapper from './components/StripeWrapper';

function App() {
  // State to manage tasks
  const [tasks, setTasks] = useState([]);
  let endpoint = '/api/'; // Ensure the endpoint points to the correct base API path

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
      const response = await api.post('/ratings', ratingData, {
        headers: {
          'Content-Type': 'application/json',
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
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        // Fetch tasks
        const tasksResponse = await api.get(`${endpoint}tasks`, {
          headers: { 'x-auth-token': token },
        });
        setTasks(tasksResponse.data);

        // Fetch top businesses
        const topBusinessesResponse = await api.get(`${endpoint}ratings/top-businesses`, {
          headers: { 'x-auth-token': token },
        });
        setTopBusinesses(topBusinessesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthProvider>
      <ProfileProvider>
        <ServiceProvider>
          <BookingProvider>
            <RatingProvider>
              <MessageProvider>
                <AdminProvider>
                  <NotificationProvider>
                    <SearchProvider>
                      <AnalyticsProvider>
                      <UserProvider>
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
                            <Route path="/top-businesses" element={<TopBusinesses />} />
                            <Route path="/services" element={<ServiceList />} />
                            <Route path="/create-service" element={<CreateService />} />
                            <Route path="/edit-service/:id" element={<EditService />} />
                            <Route path="/bookings" element={<BookingList />} />
                            <Route path="/create-booking" element={<CreateBooking />} />
                            <Route path="/ratings/:serviceId" element={<RatingList />} />
                            <Route path="/messages" element={<MessageList />} />
                            <Route path="/send-message/:receiverId" element={<SendMessage />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/notifications" element={<NotificationList />} />
                            <Route path="/search" element={<><SearchForm /><SearchResults /></>} />
                            <Route path="/pay" element={<StripeWrapper amount={50} />} /> {/* Example amount */}
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
                        </UserProvider>
                      </AnalyticsProvider>
                    </SearchProvider>
                  </NotificationProvider>
                </AdminProvider>
              </MessageProvider>
            </RatingProvider>
          </BookingProvider>
        </ServiceProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
