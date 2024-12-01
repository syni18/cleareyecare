// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { usePasswordStore } from "../../redux/store/passwordPageStore";

const ProtectedRoute = () => {
  const otpVerified = usePasswordStore((state) => state.otpVerified);

  return otpVerified ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
