import React, { useState, useEffect } from 'react';
import { searchProductsByTitle } from '../../firebase';

const SearchComponent = ({ category, setSearchResults }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState([]);

  const fetchData = async () => {
    if (searchTerm.length >= 3) {
      const results = await searchProductsByTitle(category, searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]); // Clear search results if search term is too short
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch when the component mounts
  }, [category, setSearchResults]);

  const handleSearch = () => {
    fetchData(); // Trigger search when the search button is clicked
  };

  return (
    <div className="w-full">
      <div
        className="w-full flex justify-center items-center p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-lg font-semibold">Search...</span>
      </div>
      {expanded && (
        <div className="w-full p-4">
          <div className="mb-4 flex">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow border p-2 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
