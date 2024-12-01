import { useAuth } from "" // Adjust path as necessary
import ResetPassword from "../auth/ResetPassword";

const ProtectedResetPassword = () => {
  const { isOtpVerified } = useAuth();

  if (!isOtpVerified) {
    return <Navigate to="/login" replace />;
  }

  return <ResetPassword />;
};

export default ProtectedResetPassword;
