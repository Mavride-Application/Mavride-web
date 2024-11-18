import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

// Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    return (
        <AuthContext.Provider value={{ isOtpVerified, setIsOtpVerified }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
