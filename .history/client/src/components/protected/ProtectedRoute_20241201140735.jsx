import React from 'react';

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../../redux/context/AuthContext';
import ResetPassword from '../auth/ResetPassword';

const ProtectedRoute = () => {
  const location = useLocation();
  const { state } = location; 
 const { isOtpVerified } = useAuth();
 console.log("is otp", isOtpVerified, state);
 

 if (!isOtpVerified) {
   return <Navigate to="/login" replace />;
 }

 return <ResetPassword state={state}/>;
};

export default ProtectedRoute; // Prevent re-renders unless props change
