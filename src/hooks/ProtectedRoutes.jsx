import React, { useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const isAdmin = user && user.uid === 'sGTDrSYDRBUcvzQVL5N2GiSNVE82';

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    navigate('/home');
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
