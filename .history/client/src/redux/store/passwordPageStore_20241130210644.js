// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  return (
    <AuthContext.Provider value={{ isOtpVerified, setIsOtpVerified }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
