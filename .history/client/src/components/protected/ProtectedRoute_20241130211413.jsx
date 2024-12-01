import { useAuth } from "../../context/AuthContext"; // Adjust path as necessary

const ProtectedResetPassword = () => {
  const { isOtpVerified } = useAuth();

  if (!isOtpVerified) {
    return <Navigate to="/recovery" replace />;
  }

  return <ResetPassword />;
};


