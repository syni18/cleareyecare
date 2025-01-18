import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null: loading, true: valid, false: invalid
  const sessionId = sessionStorage.getItem("newPasswordSession");

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await axios.get("/api/validate-session", {
          params: { sessionId },
        });
        setIsValid(response.data.isValid);
      } catch {
        setIsValid(false);
      }
    };

    validateSession();
  }, [sessionId]);

  if (isValid === null) return <p>Loading...</p>; // Show a loading state
  return isValid ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
