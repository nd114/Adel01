import React, { useState } from 'react';
import { getOptions, getEndpoint } from '../api';

function RatingForm() {
  const [ratingData, setRatingData] = useState({
    businessId: '',
    rating: '',
    comment: '',
  });

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
      const response = await fetch(getEndpoint('ratings'), {
        ...getOptions(ratingData),
        headers: {
          ...getOptions(ratingData).headers,
          'x-auth-token': token,
        },
      });
      const data = await response.json();
      console.log(data);
      alert('Rating submitted successfully!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Error submitting rating');
    }
  };

  return (
    <form onSubmit={handleRatingSubmit}>
      <h2>Submit Rating</h2>
      <input type="text" name="businessId" placeholder="Business ID" value={ratingData.businessId} onChange={handleRatingChange} required />
      <input type="number" name="rating" placeholder="Rating (1-5)" value={ratingData.rating} onChange={handleRatingChange} min="1" max="5" required />
      <textarea name="comment" placeholder="Comment" value={ratingData.comment} onChange={handleRatingChange} />
      <button type="submit">Submit Rating</button>
    </form>
  );
}

export default RatingForm;
