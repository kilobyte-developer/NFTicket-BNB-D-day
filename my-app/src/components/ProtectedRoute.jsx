import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { account } = useContext(AuthContext);

  if (!account) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
