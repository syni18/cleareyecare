import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/check-session",
          { withCredentials: true }
        );
        console.log("re", response);
        setIsAuthorized(response.data.flag);
      } catch {
        setIsAuthorized(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }


  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
