import React, {lazy} from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from '../../redux/context/AuthContext';
const ResetPassword = lazy(() => import("../auth/ResetPassword"));


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
