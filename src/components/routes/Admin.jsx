import React from 'react';
import { Link } from 'react-router-dom';
import { updateProducts } from '../../firebase';

const Admin = () => {
  return (
    <div className="flex-grow bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="dashboard" 
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded text-center font-medium">
            Dashboard
          </Link>
          <Link 
            to="upload" 
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded text-center font-medium">
            Product Upload
          </Link>
          <Link
            to="notes"
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-center font-medium"
          >
            Notes
          </Link>
          {/* <button className='bg-red-500 hover:bg-red-600 text-white p-2 rounded text-center font-medium' onClick={updateProducts}>
            Trigger data update.
          </button> */}

          {/* <Link 
            to="productsadm" 
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded text-center font-medium">
            Product settings
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
