import { usePasswordStore } from "../../redux/store/passwordPageStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const otpVerified = usePasswordStore((state) => state.otpVerified);
  console.log("otp");
  

  if (!otpVerified) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
