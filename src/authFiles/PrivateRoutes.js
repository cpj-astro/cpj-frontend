import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    let authenticated = localStorage.getItem('client_token'); // determine if authorized, from context or however you're doing it
    
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return authenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default PrivateRoute;