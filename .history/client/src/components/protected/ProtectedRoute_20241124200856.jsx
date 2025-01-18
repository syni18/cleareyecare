// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./store";

const ProtectedRoute = () => {
  const otpVerified = useAuthStore((state) => state.otpVerified);

  return otpVerified ? <Outlet /> : <Navigate to="/recoverypassword" />;
};

export default ProtectedRoute;
