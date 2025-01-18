import React, { useState } from "react";
import "./signup.css";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { signupValidation } from "../../helper/validate";
import AuthLeftBox from "./AuthLeftBox";
import { FacebookSvg, GithubSvg, GoogleSvg } from "../../SVG/IconSvg";

const FormField = ({ label, type, id, placeholder, fieldProps }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input type={type} id={id} placeholder={placeholder} {...fieldProps} />
  </>
);

const Signup = () => {
  const navigate = useNavigate();

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
        
        await toast.promise(registerUser({ credential: values }), {
          loading: "Creating...",
          success: <b>Registered Successfully!</b>,
          error: <b>Could not Register</b>,
        });
        // navigate("/login");
      } catch (error) {
        console.error("Error in onSubmit:", error);
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
            <Link to="/login" className="lrtady-link">
              <span className="lrtady-span-text">Already have an account?</span>
              <span className="lrtady-login">Login</span>
            </Link>
          </span>
          <div className="lort-box">
            <span className="lrtb-header">Sign Up</span>
            <span className="lr-box-auto social-signup">
              <a
                href="http://localhost:8080/v1/api/auth/google"
                className="social-btn google-btn"
              >
                <GoogleSvg />
                <span>Google</span>
              </a>
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
