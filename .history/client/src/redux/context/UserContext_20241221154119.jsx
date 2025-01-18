import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser ] = useState(null); // Default to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  const fetchUser Details = async () => {
    try {
      const response = await fetch("/v1/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user:", data.user);
        setUser (data.user || null);
      } else {
        console.error("Failed to fetch user details");
        setUser (null);
        setError("Failed to fetch user details."); // Set error message
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser (null);
      setError("An error occurred while fetching user details."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser  = () => useContext(UserContext);