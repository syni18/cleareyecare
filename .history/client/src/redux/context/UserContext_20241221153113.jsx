import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Default to null
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch("/v1/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched user:", data.user);
        setUser(data.user || null);
      } else {
        console.error("Failed to fetch user details");
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let isMounted = true; // track whether the component is mounted
  fetchUser Details();

  return () => {
    isMounted = false; // cleanup function to set isMounted to false
  };
}, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
