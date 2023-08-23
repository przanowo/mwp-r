import React, { useState, useEffect } from 'react';

const Sort = ({ products, searchTerm, onFiltered, setItemsPerPage, setSortBy, setFilters, filters, sortBy }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
        result = result.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Apply additional filters here, for example:

    if (filters.priceMin || filters.priceMax) {
      result = result.filter((product) => {
        if (filters.priceMin && filters.priceMax) {
          return product.price >= filters.priceMin && product.price <= filters.priceMax;
        } else if (filters.priceMin) {
          return product.price >= filters.priceMin;
        } else {
          return product.price <= filters.priceMax;
        }
      });
    }

    if (filters.mLMin || filters.mLMax) {
      result = result.filter((product) => {
        if (filters.mLMin && filters.mLMax) {
          return product.mL >= filters.mLMin && product.mL <= filters.mLMax;
        } else if (filters.mLMin) {
          return product.mL >= filters.mLMin;
        } else {
          return product.mL <= filters.mLMax;
        }
      });
    }

    if (filters.YearMin || filters.YearMax) {
      result = result.filter((product) => {
        if (filters.YearMin && filters.YearMax) {
          return product.Year >= filters.YearMin && product.Year <= filters.YearMax;
        } else if (filters.YearMin) {
          return product.Year >= filters.YearMin;
        } else {
          return product.Year <= filters.YearMax;
        }
      });
    }
    if (filters.cond) {
      result = result.filter((product) => {
        return product.cond === filters.cond;
      });
    }
    if (filters.sex) {
      result = result.filter((product) => {
        return product.sex === filters.sex;
      });
    }
    if (filters.Type) {
      result = result.filter((product) => {
        return product.Type === filters.Type;
      });
      
    }
    // ... (apply other filters similarly)

    // Sort products based on sortBy state
    if (sortBy) {
      let sortedResult = [...result]; // Create a new array
    
      if (sortBy === 'priceAsc') {
        sortedResult.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceDesc') {
        sortedResult.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'nameAsc') {
        sortedResult.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortBy === 'nameDesc') {
        sortedResult.sort((a, b) => b.title.localeCompare(a.title));
      }
    
      result = sortedResult; // Assign the sorted array back to result
    }
    onFiltered(result);
    
}, [products, searchTerm, filters, sortBy]); // Make sure to include all dependencies that could change the output



  return (
    <div className="my-4">
      <button className="text-blue-600 hover:text-blue-800" onClick={handleToggle}>
        Filters
      </button>
      
      {isOpen && (
        <div className=" bg-gray-100 p-4 rounded">
          {/* Number of Displayed Products */}
          <label className="block my-2">Number of products displayed:</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
          >
            <option value="" disabled selected>Please choose</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>

          {/* Sort By */}
          <label className="block my-2">Sort by:</label>
          <select 
            className="w-full mb-4 p-2 border rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="" disabled selected>Please choose</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="nameAsc">Name (A-Z)</option>
            <option value="nameDesc">Name (Z-A)</option>
          </select>

          {/* Filters */}
          <label className="block my-2">Price:</label>
          <div className="flex justify-between">
            <input 
                type="number" 
                placeholder="Min Price" 
                className="w-1/2 mr-2 p-2 border rounded"

                value={filters.priceMin}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: parseFloat(e.target.value) }))} 
            />
            <input 
                type="number" 
                placeholder="Max Price" 
                className="w-1/2 ml-2 p-2 border rounded"

                value={filters.priceMax}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: parseFloat(e.target.value) }))} 
            />
          </div>
          <label className="block my-2">Ml:</label>
          <div className="flex justify-between">
            <input 
                type="number" 
                placeholder="Min ml" 
                className="w-1/2 mr-2 p-2 border rounded"
                value={filters.mLMin}
                onChange={(e) => setFilters(prev => ({ ...prev, mLMin: parseFloat(e.target.value) }))} 
            />
            <input 
                type="number" 
                placeholder="Max ml" 
                className="w-1/2 ml-2 p-2 border rounded"
                value={filters.mLMax}
                onChange={(e) => setFilters(prev => ({ ...prev, mLMax: parseFloat(e.target.value) }))} 
            />
          </div>
          <label className="block my-2">Year:</label>
          <div className="flex justify-between">
            <input 
                type="number" 
                placeholder="Year from" 
                className="w-1/2 mr-2 p-2 border rounded"
                value={filters.YearMin}
                onChange={(e) => setFilters(prev => ({ ...prev, YearMin: parseFloat(e.target.value) }))} 
            />
            <input 
                type="number" 
                placeholder="Year to" 
                className="w-1/2 ml-2 p-2 border rounded"
                value={filters.YearMax}
                onChange={(e) => setFilters(prev => ({ ...prev, YearMax: parseFloat(e.target.value) }))} 
            />
          </div>
          <label className="block my-2">Condition:</label>
          <select 
            className="w-full mb-4 p-2 border rounded"
            onChange={(e) => setFilters(prev => ({...prev, cond: e.target.value}))}
          >
            <option value="" disabled selected>Please choose</option>
            <option value="used">Used</option>
            <option value="new">New</option>
          </select>

          <label className="block my-2">Type:</label>
          <select 
            className="w-full mb-4 p-2 border rounded"
            onChange={(e) => setFilters(prev => ({...prev, Type: e.target.value}))}
          >
            <option value="" disabled selected>Please choose</option>
            <option value="edt">EDT</option>
            <option value="edp">EDP</option>
            <option value="parfum">Parfum</option>
          </select>

          <label className="block my-2">Sex:</label>
          <select 
            className="w-full p-2 border rounded"
            onChange={(e) => setFilters(prev => ({...prev, sex: e.target.value}))}
          >
            <option value="" disabled selected>Please choose</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            <option value="unisex">Unisex</option>
            <option value="">all</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Sort;
