import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [otpSession, setOtpSession] = useState(null); // Default state as `null` to indicate loading
  const navigate = useNavigate();

  useEffect(() => {
    const storedOtpSession = localStorage.getItem("otpSession"); // Replace with actual session logic
    setOtpSession(storedOtpSession === "true");
  }, []); // Run only once on mount

  useEffect(() => {
    if (otpSession === false) {
      console.log("Redirecting to login...");
      navigate("/login", { replace: true }); // Avoids adding to browser history
    }
  }, [otpSession, navigate]); // Trigger only when `otpSession` changes

  // Logging for debugging; controlled to avoid duplicate logs
  useEffect(() => {
    console.log("otpSession:", otpSession);
  }, [otpSession]);

  if (otpSession === null) {
    // Show a loading indicator while determining the session state
    return <div>Loading...</div>;
  }

  if (otpSession === false) {
    // Prevent rendering children when redirecting
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
