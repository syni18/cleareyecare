import React from 'react';

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../../redux/context/AuthContext';
// import ResetPassword from '../auth/ResetPassword';
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));


const ProtectedRoute = () => {
  const location = useLocation();
  const { state } = location; 
 const { isOtpVerified } = useAuth();

 if (!isOtpVerified) {
   return <Navigate to="/login" replace />;
 }

 return <ResetPassword id={state.userId}/>;
};

export default ProtectedRoute; // Prevent re-renders unless props change
