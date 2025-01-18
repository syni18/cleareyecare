import React from 'react';
imp
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
 const { isOtpVerified } = useAuth();

 if (!isOtpVerified) {
   return <Navigate to="/recovery" replace />;
 }

 return <ResetPassword />;
});

export default ProtectedRoute; // Prevent re-renders unless props change
