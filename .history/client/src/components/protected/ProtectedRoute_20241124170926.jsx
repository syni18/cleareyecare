import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null: loading, true: valid, false: invalid
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = sessionStorage.getItem("resetPasswordSession");

  // Track if the cleanup has already been performed
  const [hasCleanedUp, setHasCleanedUp] = useState(false);

  // Validate the session when the component mounts
  useEffect(() => {
    const validateSession = async () => {
      if (!sessionId) {
        navigate("/login"); // No session ID, redirect to login
        return;
      }

      try {
        const response = await axios.get("/v1/api/validate-session", {
          params: { sessionId },
        });
        if (response.data.isValid) {
          setIsValid(true);
        } else {
          sessionStorage.removeItem("resetPasswordSession");
          navigate("/login");
        }
      } catch {
        sessionStorage.removeItem("resetPasswordSession");
        navigate("/login");
      }
    };

    validateSession();
  }, [sessionId, navigate]);

  // Clear the session when leaving /new-password
  useEffect(() => {
    const clearSessionOnLeave = async () => {
      if (location.pathname === "/new-password" || hasCleanedUp || !sessionId)
        return; // Skip if still on /new-password, already cleaned up, or no session ID

      try {
        await axios.post("/v1/api/logout-session", { sessionId });
        sessionStorage.removeItem("resetPasswordSession");
        setHasCleanedUp(true); // Mark cleanup as done
      } catch (error) {
        console.error("Failed to clear session:", error);
      }
    };

    clearSessionOnLeave();
  }, [location.pathname, sessionId, hasCleanedUp]);

  // Render children only if session is valid
  if (isValid === null) return <p>Loading...</p>; // Show a loading indicator
  return isValid ? children : null;
};

export default ProtectedRoute;
