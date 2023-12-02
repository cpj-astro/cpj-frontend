import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  let authenticated = localStorage.getItem('client_token');

  return authenticated ? (
    // If authenticated, render the child components
    children
  ) : (
    // If not authenticated, navigate to the sign-in page
    <Navigate to="/sign-in" replace />
  );
};

export default PrivateRoute;
