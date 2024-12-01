import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = sessionStorage.getItem("resetPasswordSession");

  useEffect(() => {
    const validateSession = async () => {
      if (!sessionId) {
        navigate("/login"); // No session, redirect to login
        return;
      }

      try {
        const response = await axios.get("/v1/api/validate-session", {
          params: { sessionId },
        });
        if (!response.data.isValid) {
          sessionStorage.removeItem("resetPasswordSession"); // Clear invalid session
          navigate("/login");
        }
      } catch {
        sessionStorage.removeItem("resetPasswordSession"); // Clear session on error
        navigate("/login");
      }
    };

    validateSession();
  }, [navigate, sessionId]);

  useEffect(() => {
    // Clear session when navigating away from /new-password
    const clearSessionOnLeave = async () => {
      if (sessionId && location.pathname !== "/new-password") {
        try {
          await axios.post("/api/logout-session", { sessionId });
          sessionStorage.removeItem("resetPasswordSession");
        } catch (error) {
          console.error("Failed to clear session:", error);
        }
      }
    };

    clearSessionOnLeave();
  }, [location.pathname, sessionId]);

  return sessionId ? children : null; // Render only if session is valid
};

export default ProtectedRoute;
