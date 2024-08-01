import React, { useContext } from 'react';
import SearchContext from '../context/SearchContext';

const SearchResults = () => {
  const { searchResults } = useContext(SearchContext);

  return (
    <div className="search-results">
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((service) => (
          <li key={service._id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>Category: {service.category}</p>
            <p>Location: {service.location}</p>
            <p>Price: ${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;