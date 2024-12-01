import { usePasswordStore } from "../../redux/store/passwordPageStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const otpVerified = usePasswordStore((state) => state.otpVerified);
  console.log("otp verify", otpVerified);
  

  if (!otpVerified) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from './authStore';

const ProtectedRoute = ({ children }) => {
  const otpVerified = useAuthStore((state) => state.otpVerified);
  console.log('ProtectedRoute - otpVerified:', otpVerified);

  if (!otpVerified) {
    console.warn('Redirecting to /recovery due to otpVerified = false');
    return <Navigate to="/recovery" />;
  }

  return children;
};

export default React.memo(ProtectedRoute); // Prevent re-renders unless props change
