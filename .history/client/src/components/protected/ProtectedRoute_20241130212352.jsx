import React from 'react';
import { usePasswordStore } from "../../redux/store/passwordPageStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = React.memo(({ children }) => {
 const { isOtpVerified } = useAuth();

 if (!isOtpVerified) {
   return <Navigate to="/recovery" replace />;
 }

 return <ResetPassword />;
});

export default ProtectedRoute; // Prevent re-renders unless props change
