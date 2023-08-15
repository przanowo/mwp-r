import { createContext, useContext } from 'react';

// Create the context
export const SearchContext = createContext();

// Custom hook for accessing the cart context
export const useSearch  = () => {
  return useContext(SearchContext);
};