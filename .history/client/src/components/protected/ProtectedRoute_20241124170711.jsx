import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null: loading, true: valid, false: invalid
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = sessionStorage.getItem("newPasswordSession");

  useEffect(() => {
    // Validate session only if it's not already checked
    const validateSession = async () => {
      if (isValid !== null || !sessionId) return; // Skip if already validated or no session ID

      try {
        const response = await axios.get("/v1/api/validate-session", {
          params: { sessionId },
        });
        setIsValid(response.data.isValid);
        if (!response.data.isValid) {
          sessionStorage.removeItem("newPasswordSession");
          navigate("/login");
        }
      } catch {
        setIsValid(false);
        sessionStorage.removeItem("resetPasswordSession");
        navigate("/login");
      }
    };

    validateSession();
  }, [sessionId, isValid, navigate]);

  useEffect(() => {
    // Clear session when leaving /new-password
    const clearSessionOnLeave = async () => {
      if (location.pathname === "/new-password" || !sessionId) return; // Skip if still on /new-password or no session ID

      try {
        await axios.post("/v1/api/logout-session", { sessionId });
        sessionStorage.removeItem("resetPasswordSession");
        setIsValid(false); // Mark session as invalid
      } catch (error) {
        console.error("Failed to clear session:", error);
      }
    };

    clearSessionOnLeave();
  }, [location.pathname, sessionId]);

  // Render children only if session is valid
  if (isValid === null) return <p>Loading...</p>; // Show a loading indicator
  return isValid ? children : null;
};

export default ProtectedRoute;
