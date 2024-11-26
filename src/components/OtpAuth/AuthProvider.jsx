import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

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

export const isAuthenticated = () => {
  const accessToken = Cookies.get("accessToken_App1");
  console.log("accessToken in isAuthenticated:", accessToken); // Debugging token
  return !!accessToken;
};

