import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, roles }) {
  const token = localStorage.getItem('token'); // Check if the user is authenticated
  const role = localStorage.getItem('role'); // Get the user's role

  // If the user is not authenticated, redirect to the login page
  if (!token) {
    return <Navigate to="/connexion" />;
  }

  // If the user's role is not in the allowed roles, redirect to the home page
  if (roles && !roles.includes(role)) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated and has the required role, render the children
  return children;
}

export default PrivateRoute;