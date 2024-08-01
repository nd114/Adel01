import React, { useEffect, useState } from 'react';
import api, { getEndpoint } from '../api';

function TopBusinesses() {
  const [topBusinesses, setTopBusinesses] = useState([]);

  useEffect(() => {
    const fetchTopBusinesses = async () => {
      try {
        const response = await fetch(getEndpoint('ratings/top-businesses'));
        const data = await response.json();
        setTopBusinesses(data);
      } catch (error) {
        console.error('Error fetching top businesses:', error);
      }
    };

    fetchTopBusinesses();
  }, []);

  return (
    <div>
      <h2>Top Businesses</h2>
      <ul>
        {topBusinesses[0] ? topBusinesses.map((business) => (
          <li key={business._id}>
            <h3>{business.username}</h3>
            <p>Average Rating: {business.averageRating.toFixed(1)}</p>
            <p>Total Ratings: {business.totalRatings}</p>
          </li>
        )): "No businesses found"}
      </ul>
    </div>
  );
}

export default TopBusinesses;
