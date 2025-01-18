// src/context/UserContext.js
import React, { createContext, useState, useContext, useCallback, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser ] = useState({}); // Initialize as an empty object
  const [loading, setLoading] = useState(true); // Loading state

  const fetchUser Details = useCallback(async () => {
    try {
      const response = await fetch("v1/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser (data.user || {}); // Set user data into the context, default to empty object
      } else {
        console.error("Failed to fetch user details");
        setUser ({}); // Reset user to empty object on error
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser ({}); // Reset user to empty object on error
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  }, []);

  useEffect(() => {
    fetchUser Details(); // Fetch user details when the component mounts
  }, [fetchUser Details]);

  const logStateChange = (newState) => {
    console.log("Changing userDetails from", user, "to", newState);
    setUser (newState);
  };

  return (
    <UserContext.Provider value={{ user, loading, set:User  logStateChange }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser  = () => useContext(UserContext);