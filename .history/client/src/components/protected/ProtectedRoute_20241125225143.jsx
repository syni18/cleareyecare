import React from 'react';
import { usePasswordStore } from "../../redux/store/passwordPageStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const otpVerified = usePasswordStore((state) => state.otpVerified);
  console.log("ProtectedRoute - otpVerified:", otpVerified);


  if (!otpVerified) {
    console.warn("Redirecting to /recovery due to otpVerified = false");
    return <Navigate to="/login" />;
  }

  return children;
};

export default React.memo(ProtectedRoute); // Prevent re-renders unless props change
