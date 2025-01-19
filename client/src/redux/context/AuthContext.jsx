// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);

   const logStateChange = (newState) => {
     setIsOtpVerified(newState);
   };

  return (
    <AuthContext.Provider value={{ isOtpVerified, setIsOtpVerified: logStateChange }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
