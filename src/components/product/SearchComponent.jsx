import React, { useState } from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { searchProductsByTitle } from '../../firebase';

const SearchComponent = ({ category, setSearchResults }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (searchTerm.length >= 3) {
      const results = await searchProductsByTitle(category, searchTerm);
      setSearchResults(results);
    } else {
      // Handle case when search term is too short
      setSearchResults([]);
    }
  };

  return (
    <div className="w-full">
      <div
        className="w-full flex justify-center items-center p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-lg font-semibold">Search...</span>
        <span className={`ml-2 transform ${expanded ? 'rotate-180' : ''}`}>
          <SlArrowDown />
        </span>
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






// import React, { useEffect, useState } from 'react';
// import { searchProductsByTitle } from '../../firebase';
// import { SlArrowDown } from 'react-icons/sl';

// const SearchComponent = ({category, setSearchResults}) => {
//   const [expanded, setExpanded] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [localSearchResults, setLocalSearchResults] = useState([]); // Renamed to localSearchResults
  
//   useEffect(() => {
//     const fetchData = async () => {
//       if (searchTerm.length > 2) {
//         const response = await searchProductsByTitle(category, searchTerm);
//         if (response.success) {
//           setLocalSearchResults(response.data);
//           setSearchResults(response.data);
//         }
//       } else {
//         setSearchResults(null);  // Clear search results if search term is empty or too short
//       }
//     };
//     fetchData();
//   }, [searchTerm]);

//   return (
//     <div className="w-full">
//       <div
//         className="w-full flex justify-center items-center p-4 cursor-pointer"
//         onClick={() => setExpanded(!expanded)}
//       >
//         <span className="text-lg font-semibold">Search...</span>
//         <span className={`ml-2 transform ${expanded ? 'rotate-180' : ''}`}>
//         <SlArrowDown />
//         </span>
//       </div>
//       {expanded && (
//         <div className="w-full p-4">
//           {/* Wide searchbar input field with a search button */}
//           <div className="mb-4 flex">
//           <input
//             type="text"
//             placeholder="Search"
//             className="flex-grow border p-2 rounded"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//             <button className="ml-2 bg-blue-500 text-white p-2 rounded">
//               Search
//             </button>
//           </div>

//           {/* Price and two input fields
//           <div className="mb-4 flex">
//             <span className="w-20">Price:</span>
//             <input
//               type="number"
//               placeholder="From"
//               className="flex-grow border p-2 rounded"
//             />
//             <span className="mx-2">to</span>
//             <input
//               type="number"
//               placeholder="To"
//               className="flex-grow border p-2 rounded"
//             />
//           </div> */}

//           {/* ml and two input fields */}
//           {/* <div className="mb-4 flex">
//             <span className="w-20">ml:</span>
//             <input
//               type="number"
//               placeholder="From"
//               className="flex-grow border p-2 rounded"
//             />
//             <span className="mx-2">to</span>
//             <input
//               type="number"
//               placeholder="To"
//               className="flex-grow border p-2 rounded"
//             />
//           </div> */}

//           {/* Select with options */}
//           {/* <div className="mb-4">
//             <select className="w-full border p-2 rounded">
//               <option value="miniature">Miniature</option>
//               <option value="sample">Sample</option>
//               <option value="vintage">Vintage</option>
//               <option value="parfume">Parfume</option>
//             </select>
//           </div> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchComponent;
