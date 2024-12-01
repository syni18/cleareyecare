// ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import { usePasswordStore } from "../../redux/store/passwordPageStore";

const ProtectedRoute = ({ children }) => {
  const otpSession = usePasswordStore((state) => state.otpSession);
  console.log("otpSession", otpSession);
  

  if (!otpSession) {
    return <Navigate to="/login" />; // Redirect to recovery if OTP is not verified
  }

  return children; // Allow access to ResetPassword if OTP is verified
};


export default ProtectedRoute;
