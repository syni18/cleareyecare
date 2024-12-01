import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/api/check-session",
          { withCredentials: true }
        );
        setIsAuthorized(response.data.resetPassword);
      } catch {
        setIsAuthorized(false);
      }
    };

    checkSession();
  }, []);

  if (isAuthorized === null) {
    return <Navigate to="/login" />; // Or a loader
  }

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
