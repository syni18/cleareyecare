// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { usePasswordStore } from "../../redux/store/passwordPageStore";

const ProtectedRoute = ({ children }) => {
  const otpVerified = useAuthStore((state) => state.otpVerified);

  if (!otpVerified) {
    return <Navigate to="/recoverypassword" />; // Redirect to recovery if OTP is not verified
  }

  return children; // Allow access to ResetPassword if OTP is verified
};


export default ProtectedRoute;
