// src/context/UserProvider.js
import { useEffect, useRef, useCallback } from "react";
import useUserStore from "../store/userStore";
import { fetchAuthorizedUser } from "../../helper/helper";

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const isFetchingRef = useRef(false); // Tracks if the fetch is already in progress

  // Zustand actions for updating the store
  const { setUser, setLoading, setError } = useUserStore();

  // Zustand state for accessing user, loading, and error
  const { user, loading, error } = useUserStore((state) => ({
    user: state.user,
    loading: state.loading,
    error: state.error,
  }));

  // Memoized fetch function to avoid re-creation on re-renders
  const fetchUserDetails = useCallback(async () => {
    if (isFetchingRef.current) return; // Prevent duplicate calls
    isFetchingRef.current = true;

    setLoading(true); // Set loading state

    try {
      const response = await fetchAuthorizedUser();
      if (response.status === 200 && response.data?.user) {
        console.log("Fetched user:", response.data.user);
        setUser(response.data.user);
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
      setLoading(false); // Reset loading state
      isFetchingRef.current = false; // Allow future fetches
    }
  }, [setUser, setLoading, setError]);

  // Fetch user details on mount
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  return <div>{children}</div>;
};
