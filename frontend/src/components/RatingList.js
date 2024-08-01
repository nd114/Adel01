import React, { useContext } from 'react';
import RatingContext from '../context/RatingContext';

const RatingList = ({ serviceId }) => {
  const {
    filteredRatings,
    searchTerm,
    setSearchTerm,
    filterCriteria,
    setFilterCriteria
  } = useContext(RatingContext);

  const serviceRatings = filteredRatings.filter((rating) => rating.service === serviceId);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCriteria({ ...filterCriteria, [e.target.name]: e.target.value });
  };

  return (
    <div className="rating-list">
      <h2>Ratings</h2>
      <input
        type="text"
        placeholder="Search by comment or username"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select name="rating" value={filterCriteria.rating || ''} onChange={handleFilterChange}>
        <option value="">Filter by rating</option>
        {[1, 2, 3, 4, 5].map((rating) => (
          <option key={rating} value={rating}>
            {rating}
          </option>
        ))}
      </select>
      <ul>
        {serviceRatings.map((rating) => (
          <li key={rating._id}>
            <p>Rating: {rating.rating}</p>
            <p>Comment: {rating.comment}</p>
            <p>User: {rating.user.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingList;
