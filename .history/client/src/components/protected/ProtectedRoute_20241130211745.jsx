import { useAuth } from "../../redux/context/AuthContext"; // Adjust path as necessary
import ResetPassword from "../auth/ResetPassword";

const ProtectedResetPassword = () => {
  const { isOtpVerified } = useAuth();

  if (!isOtpVerified) {
    return <Navigate to="/login" replace />;
  }

  return <ResetPassword />;
};

export default ProtectedResetPassword;
