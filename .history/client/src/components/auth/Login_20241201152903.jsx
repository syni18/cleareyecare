import React from "react";
import "./login.css";
import { useFormik } from "formik";
import AuthLeftBox from "./AuthLeftBox";
import { loginUser, signupWithGoogle } from "../../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { loginValidation } from "../../helper/validate";
import { FacebookSvg, GoogleSvg } from "../../SVG/IconSvg";

const FormField = ({ label, type, id, placeholder, fieldProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...fieldProps} />
  </>
);

function Login() {
  const navigate = useNavigate();
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {

        const response = await toast.promise(
          loginUser({ credential: values }),
          {
            loading: "Logging...",
            success: (response) => {
              return <b>{response.msg || "Login Successfully!"}</b>;
            },
            error: (error) => {
              return <b>{error.msg || "Could not Login"}</b>;
            },
          }
        );
        navigate("/");
      } catch (error) {
        console.log("Error during login: ", error);
      }
    },
  });

  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <span className="lort-already">
            <Link to="/signup" className="lrtady-link">
              <span className="lrtady-span-text">Let’s Get You Started!</span>
              <span className="lrtady-login">Sign Up</span>
            </Link>
          </span>
          <div className="lort-box">
            <span className="lrtb-header">Sign In</span>
            <span className="lr-box-auto social-signup">
              <button
                onClick={signupWithGoogle}
                className="social-btn google-btn"
              >
                <GoogleSvg />
                <span>Google</span>
              </button>
              <a
                href="http://localhost:8080/v1/api/auth/facebook"
                className="social-btn facebook-btn"
              >
                <FacebookSvg />
                <span>Facebook</span>
              </a>
            </span>
            <div className="horizontal-divider-with-text">
              Or continue with email address
            </div>
            <form className="login-form-wrapper" onSubmit={handleSubmit}>
              <FormField
                label="Enter Email Address"
                type="email"
                id="email-help"
                placeholder="john@example.com"
                fieldProps={getFieldProps("email")}
              />
              <FormField
                label="Enter your Password"
                type="password"
                id="paswd-help"
                placeholder="password"
                fieldProps={getFieldProps("password")}
              />
              <div className="lfw-forget">
                Trouble logging in?
                <Link to="/recovery">
                  <span className="lfw-forget-link">Recover your account</span>
                </Link>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
