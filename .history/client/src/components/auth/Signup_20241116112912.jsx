import React from 'react'
import './signup.css';
import { useFormik } from 'formik';
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../helper/validate";
import AuthLeftBox from './AuthLeftBox';
import { GoogleSvg } from '../../SVG/IconSvg';
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from '../../../reducer/reducer.js';

function Signup() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handleCloseBox = () => {
    navigate("/");
  };
  const handleGoogleLogin = () => {
    // Call your backend API to initiate Google login via Passport.js
    window.open("/v1/api/auth/google", "_self"); // Adjust the URL according to your setup
  };
  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
    },
    validate: registerValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        // console.log("submit values ", values);
        let registerPromise = registerUser({ credential: values });
        await toast.promise(registerPromise, {
          loading: "Creating...",
          success: <b>Register Successfully...!</b>,
          error: <b>Could not Register</b>,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error in onSubmit:", error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    },
  });
  return (
    <section className="login-wrapper">
      <Toaster position="bottom-right"></Toaster>
      <div className="login-container">
        <AuthLeftBox />
        <div className="loco-right">
          <span className="lr-heading">Sign up</span>
          <div className="lr-box">
            <span className="lr-box-auto">
              <a
                href="http://localhost:8080/v1/api/auth/google"
                className="social-btn google-btn"
              >
                <GoogleSvg />
                <span>Signup with Google</span>
              </a>
              <div className="divider">|</div>
              <a
                href="http://localhost:8080/v1/api/auth/facebook"
                className="social-btn facebook-btn"
              >
                <FacebookSvg />
                <span>Signup with Facebook</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;