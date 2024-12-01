// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { usePasswordStore } from "../../redux/store/passwordPageStore";

const ProtectedRoute = () => {
  const otpSession = usePasswordStore((state) => state.otpSession);

  return otpSession ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
