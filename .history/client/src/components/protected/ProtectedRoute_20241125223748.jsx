import { use } from "./authStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const otpVerified = useAuthStore((state) => state.otpVerified);

  if (!otpVerified) {
    return <Navigate to="/recovery" />;
  }

  return children;
};

export default ProtectedRoute;
