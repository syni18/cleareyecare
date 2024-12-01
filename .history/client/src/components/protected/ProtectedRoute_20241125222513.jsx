import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [otpSession, setOtpSession] = useState(null); // Initial state as `null`
  const navigate = useNavigate();

  useEffect(() => {
    const storedOtpSession = localStorage.getItem("otpSession"); // Replace with actual session logic
    setOtpSession(storedOtpSession === "true");
  }, []);

  useEffect(() => {
    if (otpSession === false) {
      console.log("Redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [otpSession, navigate]);

  useEffect(() => {
    console.log("otpSession:", otpSession);
  }, [otpSession]);

  if (otpSession === null) {
    // Show a loading indicator while determining the session state
    return <div>Loading...</div>;
  }

  if (otpSession === false) {
    // Prevent rendering children during redirection
    return null;
  }

  // Render children when session is valid
  return <>{children}</>;
};

export default ProtectedRoute;
