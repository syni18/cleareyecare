// src/context/UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when no user is logged in

   const logStateChange = (newState) => {
     console.log("Changing userDetails from", user, "to", newState);
     setUser(newState);
   };
  return (
    <UserContext.Provider value={{ user, setUser: logStateChange }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
