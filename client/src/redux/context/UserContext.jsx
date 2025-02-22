import { createContext, useState, useContext } from "react";
import { fetchAuthorizedUser } from "../../helper/helper";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user, setUser ] = useState(null); // Default to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to handle errors

  const fetchUserDetails = async () => {
    try { 
      const response = await fetchAuthorizedUser();

      if (response.status === 200) {
        console.log("Fetched user:", response.data.user);
        setUser (response.data.user || null);
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

  // useEffect(() => {
  //   fetchUserDetails();
  // }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, setUser  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser  = () => useContext(UserContext);