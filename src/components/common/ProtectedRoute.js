// src/components/common/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('eduTaskToken'); // You can modify this based on your auth logic

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/edutask/portal" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;