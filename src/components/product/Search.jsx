// Search.jsx
import React, { useState, useEffect } from 'react';
import { fetchProductsFromFirestore } from '../../firebase';

const Search = ({ onSearch }) => {
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProductsFromFirestore();
      setProducts(fetchedProducts);
      console.log(products);
    };

    loadProducts();
    console.log(products);
  }, []);

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <div className='flex w-full relative'>
      <input
        type='text' 
        value={searchTerm} 
        onChange={handleSearchChange}
        placeholder="Search for products..." 
        className="border p-2 w-full rounded pl-3 pr-8"/>
        {searchTerm && (
        <button 
          onClick={clearSearch} 
          className="absolute top-1/2 transform -translate-y-1/2 right-3 flex items-center justify-center bg-transparent w-5 h-5 text-gray-500 cursor-pointer" 
          style={{ height: '1rem', width: '1rem' }}
        >
          x
        </button>
      )}
      
    </div>
  );
};

export default Search;
