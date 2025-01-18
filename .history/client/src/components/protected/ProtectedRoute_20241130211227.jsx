import { useAuth } from "../../context/AuthContext"; // Adjust path as necessary

const ProtectedResetPassword = () => {
  const { isOtpVerified } = useAuth();

  if (!isOtpVerified) {
    return <Navigate to="/recovery" replace />;
  }

  return <ResetPassword />;
};

// In your router definition
const router = createBrowserRouter([
  // ... other routes ...
  {
    path: "/reset-password",
    element: (
      <Layout showHeaderFooter={false}>
        <ProtectedResetPassword />
      </Layout>
    ),
  },
]);
