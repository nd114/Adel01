import React, { createContext, useState } from 'react';
import api from '../api'; //import axios from 'axios';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState(' ');

  const searchServices = async (searchParams) => {
    const res = await api.get(/*(axios.get(*/'/api/search', { params: searchParams });
    setSearchResults(res.data);
  };

  return (
    <SearchContext.Provider value={{ searchResults, searchServices }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;