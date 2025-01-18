// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);

   const logStateChange = (newState) => {
     console.log("Changing isOtpVerified from", isOtpVerified, "to", newState);
     setIsOtpVerified(newState);
   };

  return (
    <AuthContext.Provider value={{ isOtpVerified, setIsOtpVerified: l }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
