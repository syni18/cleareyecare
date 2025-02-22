import { useEffect } from "react";
import { useFormik } from "formik";
import AuthLeftBox from "./AuthLeftBox";
import toast, { Toaster } from "react-hot-toast";
import { resetPassword } from "../../helper/helper";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../redux/context/AuthContext";
import { resetPasswordValidation } from "../../helper/validate";

// eslint-disable-next-line react/prop-types
const FormField = ({ label, type, id, placeholder, fieldProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...fieldProps} />
  </>
);

function ResetPassword(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsOtpVerified } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname === "/reset-password") {
        setIsOtpVerified(false);
        navigate("/login");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate, location.pathname, setIsOtpVerified]);

  const formik = useFormik({
    initialValues: {
      // eslint-disable-next-line react/prop-types
      id: props.id,
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await toast.promise(resetPassword(values), {
          loading: "updating...",
          success: (response) => {
            return <b>{response.msg || "Reset Successfully!"}</b>;
          },
          error: (error) => {
            return <b>{error.msg || "Could not reset password!"}</b>;

          },
        });
        if(response.status){
          navigate("/login");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
      } finally {
        setSubmitting(false); // Ensure that we reset the submitting state
      }
    },
  });

  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <div className="lort-box">
            <span className="lrtb-header">Create New Secret</span>
            <form className="login-form-wrapper" onSubmit={formik.handleSubmit}>
              <FormField
                label="Set New Password"
                type="password"
                id="pswd-help"
                placeholder="Choose a strong password"
                fieldProps={formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="error">{formik.errors.password}</div>
              )}
              <FormField
                label="Verify Password"
                type="password"
                id="cnf-paswd-help"
                placeholder="Retype password to confirm"
                fieldProps={formik.getFieldProps("confirmPassword")}
              />
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <div className="error">{formik.errors.confirmPassword}</div>
                )}
              <button type="submit">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
