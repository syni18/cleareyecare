// src/context/UserContext.js
import React, { createContext, useState, useContext, useCallback } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null when no user is logged in

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch("v1/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Set user data into the context
      } else {
        console.error("Failed to fetch user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }, []);
  useE

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
