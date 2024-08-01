import { createContext, useState, useEffect } from 'react';
import api from '../api';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [ratings, setRatings] = useState([]);
  const [filteredRatings, setFilteredRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState({});

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await api.get('/ratings');
        setRatings(res.data);
        setFilteredRatings(res.data);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  useEffect(() => {
    filterAndSearchRatings();
  }, [searchTerm, filterCriteria, ratings]);

  const filterAndSearchRatings = () => {
    let result = ratings;

    if (searchTerm) {
      result = result.filter(rating =>
        rating.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rating.user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCriteria.rating) {
      result = result.filter(rating => rating.rating === filterCriteria.rating);
    }

    setFilteredRatings(result);
  };

  const createRating = async (ratingData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await api.post('/ratings', ratingData, { headers: { 'x-auth-token': token } });
      setRatings((prevRatings) => [...prevRatings, res.data]);
    } catch (error) {
      console.error('Error creating rating:', error);
    }
  };

  const updateRating = async (id, ratingData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const res = await api.put(`/ratings/${id}`, ratingData, { headers: { 'x-auth-token': token } });
      setRatings((prevRatings) => prevRatings.map((rating) => (rating._id === id ? res.data : rating)));
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const deleteRating = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await api.delete(`/ratings/${id}`, { headers: { 'x-auth-token': token } });
      setRatings((prevRatings) => prevRatings.filter((rating) => rating._id !== id));
    } catch (error) {
      console.error('Error deleting rating:', error);
    }
  };

  return (
    <RatingContext.Provider value={{
      ratings,
      filteredRatings,
      createRating,
      updateRating,
      deleteRating,
      searchTerm,
      setSearchTerm,
      filterCriteria,
      setFilterCriteria
    }}>
      {children}
    </RatingContext.Provider>
  );
};

export default RatingContext;
