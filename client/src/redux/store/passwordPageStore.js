// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
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
