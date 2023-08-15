import { createContext, useContext } from 'react';

// Create the context
export const CartContext = createContext();

// Custom hook for accessing the cart context
export const useCart = () => {
  return useContext(CartContext);
};
