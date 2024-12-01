import { usePasswordStore } from "../../redux/store/passwordPageStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const otpVerified = us((state) => state.otpVerified);

  if (!otpVerified) {
    return <Navigate to="/recovery" />;
  }

  return children;
};

export default ProtectedRoute;
