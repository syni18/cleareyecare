// src/context/UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when no user is logged in

   const [isOtpVerified, setIsOtpVerified] = useState(false);

   const logStateChange = (newState) => {
     console.log("Changing isOtpVerified from", isOtpVerified, "to", newState);
     setIsOtpVerified(newState);
   };ata);
  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
