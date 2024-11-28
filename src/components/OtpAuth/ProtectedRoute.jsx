import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';


const ProtectedRoute = ({ children }) => {
    const { isOtpVerified } = useAuth();

    if (!isOtpVerified) {
        // Redirect to OTP page if not verified
        return <Navigate to="/signup" />;
    }
    
    return children;
};

export default ProtectedRoute;




