import React from "react";
import "./signup.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { signupValidation } from "../../helper/validate";
import { FacebookSvg, GoogleSvg } from "../../SVG/IconSvg";
import { registerUser, signupWithGoogle } from "../../helper/helper";
import AuthLeftBox from "./AuthLeftBox";

const FormField = ({ label, type, id, placeholder, fieldProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...fieldProps} />
  </>
);

const Signup = () => {
  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validate: signupValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        console.log("value", values);
        
        const response = await toast.promise(registerUser ({ credential: values }), {
            loading: "Creating...",
            success: (response) => {
                return <b>{response.msg || "Registered Successfully!"}</b>;
            },
            error: (error) => {
                return <b>{error.msg || "Could not Register"}</b>;
            },
          });
      } catch (error) {
        console.error("Error in onSubmit:", error);
      }
    },
  });

  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right" />
      <div className="login-container">
        <AuthLeftBox/>
        <div className="loco-right">
          <span className="lort-already">
            <Link to="/login" className="lrtady-link">
              <span className="lrtady-span-text">Already have an account?</span>
              <span className="lrtady-login">Login</span>
            </Link>
          </span>
          <div className="lort-box">
            <span className="lrtb-header">Sign Up</span>
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
              <div className="lfw-name">
                {["firstname", "lastname"].map((field, index) => (
                  <span key={index}>
                    <FormField
                      label={field === "firstname" ? "First Name" : "Last Name"}
                      type="text"
                      id={`${field}-help`}
                      placeholder={field === "firstname" ? "john" : "doe"}
                      fieldProps={getFieldProps(field)}
                    />
                  </span>
                ))}
              </div>
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
              <button type="submit">Start Shopping</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
