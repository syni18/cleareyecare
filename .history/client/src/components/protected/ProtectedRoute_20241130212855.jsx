import React from 'react';

import { Navigate } from "react-router-dom";
import { useAuth } from '../../redux/context/AuthContext';
import ResetPassword from '../auth/ResetPassword';

const ProtectedRoute = () => {
 const { isOtpVerified } = useAuth();
 console.log("is otp", is);
 

 if (!isOtpVerified) {
   return <Navigate to="/login" replace />;
 }

 return <ResetPassword />;
};

export default ProtectedRoute; // Prevent re-renders unless props change
