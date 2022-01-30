import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {
    
    const state = useSelector( state => state.auth );

    return (state?.uid)
        ? <Navigate to="/"/>
        : children
}
