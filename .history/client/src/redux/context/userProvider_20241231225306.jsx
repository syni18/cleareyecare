// src/context/UserProvider.js
import React, { useEffect } from "react";
import useUserStore from "../store/userStore";
import { fetchAuthorizedUser } from "../../helper/helper";

export const UserProvider = ({ children }) => {
  const isFetchingRef = useRef(false); // Tracks if the fetch is already in progress
  const { setUser, setLoading, setError } = useUserStore();
  const { user, loading, error } = useUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    error: state.error,
  }));

  const fetchUserDetails = async () => {
    if (isFetchingRef.current) return; // Prevent duplicate calls
    isFetchingRef.current = true;

    console.log("Fetching user calling");

    setLoading(true); // Set loading true when fetching data
    try {
      const response = await fetchAuthorizedUser();

      if (response.status === 200) {
        console.log("Fetched user:", response.data.user);
        setUser(response.data.user || null);
      } else {
        console.error("Failed to fetch user details");
        setUser(null);
        setError("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
      setError("An error occurred while fetching user details.");
    } finally {
      setLoading(false); // Set loading false after fetching is done
      isFetchingRef.current = false; // Reset ref after fetching is done
    }
  };

  useEffect(() => {
    console.log("UserProvider mounted");
    fetchUserDetails();

    return () => {
      console.log("UserProvider unmounted");
    };
  }, []);

  return (
    <div>
      {/* Pass down user, loading, and error states to children */}
      {children}
    </div>
  );
};
