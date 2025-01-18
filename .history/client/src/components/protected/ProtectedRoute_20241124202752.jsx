// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { usePasswordStore } from "../../redux/store/passwordPageStore";

const ProtectedRoute = () => {
  const otpSession = usePasswordStore((state) => state.otpSession);

  if (!otpSession) {
    return <Navigate to="/login" />; // Redirect to login if OTP is not verified
  }

  return <Outlet />; // Render nested routes
};

export default ProtectedRoute;
