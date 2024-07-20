import React from "react";
import "./login.css";
import { useFormik } from "formik";
import { Minimize } from "lucide-react";
import { loginUser } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { loginValidate } from "../../helper/validate";

const FormField = ({ label, type, id, placeholder, formikProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...formikProps} />
  </>
);

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const loginPromise = loginUser({ credential: values });
        const res = await toast.promise(loginPromise, {
          loading: "Logging in...",
          success: <b>Login Successful</b>,
          error: <b>Login Error</b>,
        });
        localStorage.setItem("token", res.token);
        navigate("/");
      } catch (error) {
        console.error("Error in onSubmit: ", error);
      }
    },
  });

  const handleCloseBox = () => {
    navigate("/");
  };

  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <span className="auth-wrap-close" onClick={handleCloseBox}>
          <Minimize /> <span className="auth-wrcl-text">Close</span>
        </span>
        <div className="loco-left">
          <h1>Login</h1>
          <h3>
            Get access to your Orders,
            <br /> Wishlist and Recommendations
          </h3>
        </div>
        <div className="loco-right">
          <form className="login-form-wrapper" onSubmit={handleSubmit}>
            <FormField
              label="Enter Email Address"
              type="email"
              id="email-help"
              placeholder="john@example.com"
              formikProps={getFieldProps("email")}
            />
            <FormField
              label="Enter your Password"
              type="password"
              id="paswd-help"
              placeholder="******"
              formikProps={getFieldProps("password")}
            />
            <p>
              By continuing, you agree to Cleareyecare's <em>Terms of Use</em>{" "}
              and <em>Privacy Policy</em>.
            </p>
            <button type="submit">Login</button>
          </form>
          <Link className="loco-recovery-link" to="/recovery">
            Recover Password
          </Link>
          <Link className="loco-regis-link" to="/signup">
            New to Cleareyecare? Create an Account.
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
