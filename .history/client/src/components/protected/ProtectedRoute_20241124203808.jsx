import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [otpSession, setOtpSession] = useState(false);
  const navigate = useNavigate();

  // Mock function to simulate fetching otpSession status (you can replace this with actual logic)
  useEffect(() => {
    const storedOtpSession = localStorage.getItem("otpSession"); // For example, check in localStorage
    setOtpSession(storedOtpSession === "true"); // Assuming storedOtpSession is "true" or "false"
  }, []); // Run only once when the component mounts

  // Log otpSession change to check if the state updates correctly
  useEffect(() => {
    console.log("otpSession", otpSession);
  }, [otpSession]);

  // Redirect if no otpSession or expired session
  useEffect(() => {
    if (!otpSession) {
      console.log("Redirecting to login...");
      navigate("/login");
    }
  }, [otpSession, navigate]); // Re-run this effect when otpSession changes

  if (otpSession === null) {
    // In case you want to handle loading state or some other default state
    return <div>Loading...</div>;
  }

  // Render protected route content if otpSession is true
  return <>{children}</>;
};

export default ProtectedRoute;
