import React from 'react';

const Dashboard = () => {
  return (
    <div className='flex flex-col items-center mt-28'>
      <div className='flex '>
        <h1>Admin Dashboard</h1>
      </div>
      <div className='flex bg-red-700'>
        <div className='flex bg-green-700'>Menu</div>
        <div className='flex bg-blue-700'>Rendered content</div>
      </div>
    </div>
  );
};

export default Dashboard;
