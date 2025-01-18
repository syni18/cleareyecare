import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // null: loading, true: valid, false: invalid
  const [cleanupDone, setCleanupDone] = useState(false); // Prevent repeated cleanup
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = sessionStorage.getItem("resetPasswordSession");

  // Validate the session when the component mounts
  useEffect(() => {
    const validateSession = async () => {
      if (!sessionId) {
        navigate("/login"); // No session, redirect immediately
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

    // Validate only once
    if (isValid === null) validateSession();
  }, [sessionId, isValid, navigate]);

  // Clear session when leaving the route
  useEffect(() => {
    const clearSessionOnLeave = async () => {
      if (!sessionId || cleanupDone) return; // Skip if no session or already cleaned up
      if (location.pathname === "/new-password") return; // Stay on /new-password, no cleanup

      try {
        await axios.post("/v1/api/logout-session", { sessionId });
        sessionStorage.removeItem("resetPasswordSession");
        setCleanupDone(true); // Mark cleanup as done
      } catch (error) {
        console.error("Failed to clear session:", error);
      }
    };

    clearSessionOnLeave();
  }, [location.pathname, sessionId, cleanupDone]);

  // Loading state
  if (isValid === null) return <p>Loading...</p>;

  // Render children only if the session is valid
  return isValid ? children : <Navigate>;
};

export default ProtectedRoute;
