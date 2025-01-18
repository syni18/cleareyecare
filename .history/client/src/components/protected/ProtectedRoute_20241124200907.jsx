// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { usePStore } from "./store";

const ProtectedRoute = () => {
  const otpVerified = useAuthStore((state) => state.otpVerified);

  return otpVerified ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
